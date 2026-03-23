/**
 * Build script for DTCG 2025.10 design tokens.
 *
 * Reads tokens/tokens.json and generates:
 *   - tokens/generated/tokens.css  (CSS custom properties for Tailwind v4)
 *   - tokens/generated/tokens.dart (Dart constants for Flutter)
 *
 * Usage: npx tsx tokens/build-tokens.ts
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_PATH = join(__dirname, "tokens.json");
const OUT_DIR = join(__dirname, "generated");

// ─── Types ───────────────────────────────────────────────────────────────────

interface ColorValue {
  colorSpace: string;
  components: number[];
  alpha?: number;
  hex?: string;
}

interface DimensionValue {
  value: number;
  unit: string;
}

interface Token {
  $type?: string;
  $value?: unknown;
  [key: string]: unknown;
}

// ─── Token Walking ───────────────────────────────────────────────────────────

interface FlatToken {
  path: string[];
  type: string;
  value: unknown;
}

function walkTokens(obj: Record<string, unknown>, path: string[] = [], inheritedType?: string): FlatToken[] {
  const results: FlatToken[] = [];
  const currentType = (obj.$type as string | undefined) ?? inheritedType;

  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;

    const node = val as Token;
    if (node && typeof node === "object" && "$value" in node) {
      const tokenType = node.$type ?? currentType;
      if (tokenType) {
        results.push({ path: [...path, key], type: tokenType, value: node.$value });
      }
    } else if (node && typeof node === "object") {
      results.push(...walkTokens(node as Record<string, unknown>, [...path, key], currentType));
    }
  }

  return results;
}

// ─── CSS Generation ──────────────────────────────────────────────────────────

function colorToCSS(v: ColorValue): string {
  const [r, g, b] = v.components;
  const alpha = v.alpha;

  if (alpha !== undefined && alpha < 1) {
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
  }

  if (v.hex) return v.hex;
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function tokenToCSSName(path: string[]): string {
  // Map DTCG paths to existing Tailwind custom property names
  const joined = path.join("-");

  // Special mappings for Tailwind compatibility
  const mappings: Record<string, string> = {
    "color-primary-base": "color-primary",
    "color-secondary-base": "color-secondary",
    "color-border-default": "color-border",
    "color-semantic-success": "color-success",
    "color-semantic-warning": "color-warning",
    "color-semantic-error": "color-error",
  };

  return `--${mappings[joined] ?? joined}`;
}

function generateCSS(tokens: FlatToken[]): string {
  const lines: string[] = [
    "/* Auto-generated from tokens/tokens.json — do not edit manually */",
    "/* DTCG 2025.10 compliant source: tokens/tokens.json */",
    "",
    "@theme inline {",
  ];

  // Group by type for comments
  let lastGroup = "";

  for (const token of tokens) {
    const group = token.path[0];
    if (group !== lastGroup) {
      if (lastGroup) lines.push("");
      lines.push(`  /* ${group} */`);
      lastGroup = group;
    }

    const name = tokenToCSSName(token.path);
    let value: string;

    switch (token.type) {
      case "color":
        value = colorToCSS(token.value as ColorValue);
        break;
      case "fontFamily":
        value = (token.value as string[]).map(f => (f.includes(" ") ? `"${f}"` : f)).join(", ");
        break;
      case "duration": {
        const dur = token.value as DimensionValue;
        value = `${dur.value}${dur.unit}`;
        break;
      }
      default:
        value = String(token.value);
    }

    lines.push(`  ${name}: ${value};`);
  }

  lines.push("}");

  return lines.join("\n") + "\n";
}

// ─── Dart Generation ─────────────────────────────────────────────────────────

function colorToDart(v: ColorValue): string {
  const [r, g, b] = v.components;
  const alpha = v.alpha ?? 1;
  const a = Math.round(alpha * 255);
  const ri = Math.round(r * 255);
  const gi = Math.round(g * 255);
  const bi = Math.round(b * 255);
  return `Color.fromARGB(${a}, ${ri}, ${gi}, ${bi})`;
}

function pathToDartName(path: string[]): string {
  return path
    .map((segment, i) => {
      // camelCase: first segment lowercase, rest capitalized
      const clean = segment.replace(/[^a-zA-Z0-9]/g, "");
      if (i === 0) return clean.toLowerCase();
      return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
    })
    .join("");
}

function generateDart(tokens: FlatToken[]): string {
  const lines: string[] = [
    "// Auto-generated from tokens/tokens.json — do not edit manually",
    "// DTCG 2025.10 compliant source: tokens/tokens.json",
    "",
    "import 'package:flutter/material.dart';",
    "",
    "abstract class B42Tokens {",
    "  B42Tokens._();",
    "",
  ];

  let lastGroup = "";

  for (const token of tokens) {
    const group = token.path[0];
    if (group !== lastGroup) {
      if (lastGroup) lines.push("");
      lines.push(`  // ${group}`);
      lastGroup = group;
    }

    const name = pathToDartName(token.path);

    switch (token.type) {
      case "color":
        lines.push(`  static const Color ${name} = ${colorToDart(token.value as ColorValue)};`);
        break;
      case "fontFamily": {
        const families = token.value as string[];
        lines.push(`  static const String ${name} = '${families[0]}';`);
        if (families.length > 1) {
          lines.push(
            `  static const List<String> ${name}Fallback = [${families.map(f => `'${f}'`).join(", ")}];`
          );
        }
        break;
      }
      case "duration": {
        const dur = token.value as DimensionValue;
        lines.push(`  static const Duration ${name} = Duration(milliseconds: ${dur.value});`);
        break;
      }
    }
  }

  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const raw = readFileSync(TOKENS_PATH, "utf-8");
  const data = JSON.parse(raw);
  const tokens = walkTokens(data);

  mkdirSync(OUT_DIR, { recursive: true });

  const css = generateCSS(tokens);
  const cssPath = join(OUT_DIR, "tokens.css");
  writeFileSync(cssPath, css);
  console.log(`✓ Generated ${cssPath} (${tokens.length} tokens)`);

  const dart = generateDart(tokens);
  const dartPath = join(OUT_DIR, "tokens.dart");
  writeFileSync(dartPath, dart);
  console.log(`✓ Generated ${dartPath}`);
}

main();
