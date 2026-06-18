#!/usr/bin/env node
/**
 * BBI Argentina — Content Lint Script
 * Fails the build if prohibited lexicon or punctuation appears in content files.
 *
 * Rules enforced:
 *   1. Prohibited words/phrases (per Brand Voice & Style Guide)
 *   2. No exclamation points anywhere in content files
 *   3. No ellipses anywhere in content files
 *   4. Platform layer synonyms (sourcing, listing, consulting, etc.)
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const PROHIBITED_TERMS = [
  // Emotional superlatives
  /\bamazing\b/i,
  /\bincredible\b/i,
  /\bstunning\b/i,
  /\bbreathtaking\b/i,
  /\bonce-in-a-lifetime\b/i,
  /\bworld-class\b/i,
  /\bpremier\b(?!\s+(wine|agricultural|investment\s+platform))/i,
  /\bhidden\s+gem\b/i,
  /\bbest-kept\s+secret\b/i,
  // Dismissive phrases
  /\bdon'?t\s+worry\b/i,
  /\brest\s+assured\b/i,
  // Corporate filler
  /\bwe\s+are\s+excited\s+to\s+announce\b/i,
  /\bjust\b(?!\s+(in\s+time|a\s+(few|moment|minute|second)))/i,
  /\bsimply\b/i,
  /\beasy\b/i,
  // Jargon prohibited
  /\bleverage\b/i,
  /\bunlock\b/i,
  /\bsynergy\b/i,
  /\bsynergies\b/i,
  /\bholistic\b/i,
  /\bcomprehensive\b/i,
  /\bluxury\b(?!\s+(villa|estate|wine|lodge)\s+(with|featuring|offering))/i,
  /\bexciting\b/i,
  /\bthrilling\b/i,
  /\bpassionate\b/i,
  // Diminishing platform terms
  /\bbroker\b/i,
  /\bagent\b(?!\s+(of\s+record|agreement))/i,
  /\blisting\s+service\b/i,
  // Overused institutional
  /\binstitutional\s+capital\b/i,
  // Platform layer synonyms (Rule 1 — exact terminology only)
  /\bsourcing\b(?!\s+(water|assets?\s+from))/i,
  /\bconsulting\b/i,
  /\bguidance\b/i,
  /\bimplementation\b/i,
  /\bmanagement\b(?!\s+(team|company|structure|framework|layer))/i,
]

// Punctuation rules applied to ALL files
const PROHIBITED_PUNCTUATION = [
  { pattern: /!/g, name: 'exclamation point' },
  { pattern: /\.\.\./g, name: 'ellipsis' },
  { pattern: /…/g, name: 'ellipsis (unicode)' },
]

// Directories to scan for content
const CONTENT_DIRS = [
  'src/app',
  'src/components',
  'src/lib',
]

// File extensions to check
const CONTENT_EXTENSIONS = ['.ts', '.tsx', '.mdx', '.md']

// Extensions to also check for prohibited terms (not just punctuation)
const TERM_SCAN_EXTENSIONS = ['.tsx', '.mdx', '.md']

// Patterns to skip (code constructs, not content)
const SKIP_LINE_PATTERNS = [
  /^\s*\/\//,                 // single-line comments
  /^\s*\*/,                   // JSDoc / block comment lines
  /^\s*import /,              // import statements
  /^\s*export /,              // export statements
  /className=/,               // Tailwind class strings
  /aria-/,                    // accessibility attributes
  /placeholder=/,             // form placeholder attributes
  /`.*`/,                     // template literals with code
  // Code constructs — JS/TS logic, not prose content
  /^\s*if\s*\(/,              // if (...) statements
  /^\s*}\s*else/,             // else blocks
  /^\s*const\s/,              // const declarations
  /^\s*let\s/,                // let declarations
  /^\s*return\s/,             // return statements
  /^\s*throw\s/,              // throw statements
  /=>\s*\{/,                  // arrow function bodies
  /\.\.\.\s*\w/,              // spread operator (e.g. ...s, ...additionalProperties)
  /\.\.\.\(/,                 // spread with conditional (e.g. ...(condition ? [...] : []))
  /\(\.\.\./,                 // rest/spread in function args
  /if\s*\(!/,                 // if (!token) style guards
  /\|\|/,                     // logical OR
  /&&/,                       // logical AND
  /\.ok\)/,                   // response.ok checks
  /onChange=\{/,              // React event handlers
  /onClick=\{/,               // React event handlers
  /setSelection/,             // state setter calls
  /setIsOpen/,                // state setter calls
  /response\.ok/,             // HTTP response checks
  /pattern\.lastIndex/,       // regex reset
  /process\.exit/,            // process calls
  // Allow known proper uses
  /PROHIBITED/,
  /content-lint/,
  /Brand\s+Voice/,
]

function shouldSkipLine(line) {
  return SKIP_LINE_PATTERNS.some(p => p.test(line))
}

/**
 * Walk directory recursively, returning file paths
 */
function walkDir(dir, results = []) {
  try {
    const entries = readdirSync(dir)
    for (const entry of entries) {
      const fullPath = join(dir, entry)
      try {
        const stat = statSync(fullPath)
        if (stat.isDirectory()) {
          // Skip node_modules, .next, generated files
          if (!['node_modules', '.next', 'dist', '.git'].includes(entry)) {
            walkDir(fullPath, results)
          }
        } else if (CONTENT_EXTENSIONS.includes(extname(entry))) {
          results.push(fullPath)
        }
      } catch {
        // skip inaccessible files
      }
    }
  } catch {
    // skip inaccessible directories
  }
  return results
}

let errorCount = 0
let warningCount = 0
const errors = []

function lintFile(filePath) {
  let content
  try {
    content = readFileSync(filePath, 'utf-8')
  } catch {
    return
  }

  const lines = content.split('\n')
  const ext = extname(filePath)
  const scanTerms = TERM_SCAN_EXTENSIONS.includes(ext)

  lines.forEach((line, index) => {
    const lineNum = index + 1

    // Always check punctuation in content-bearing files
    for (const { pattern, name } of PROHIBITED_PUNCTUATION) {
      if (pattern.test(line) && !shouldSkipLine(line)) {
        errors.push(`  ${filePath}:${lineNum} — Prohibited ${name}: ${line.trim().slice(0, 80)}`)
        errorCount++
      }
      pattern.lastIndex = 0
    }

    // Check prohibited terms in TSX/MDX/MD files
    if (scanTerms && !shouldSkipLine(line)) {
      for (const pattern of PROHIBITED_TERMS) {
        if (pattern.test(line)) {
          errors.push(`  ${filePath}:${lineNum} — Prohibited term [${pattern.source}]: ${line.trim().slice(0, 80)}`)
          errorCount++
        }
        pattern.lastIndex = 0
      }
    }
  })
}

console.log('BBI Argentina — Content Lint\n')
console.log('Scanning content files for prohibited terms and punctuation...\n')

const cwd = process.cwd()
for (const dir of CONTENT_DIRS) {
  const fullDir = join(cwd, dir)
  const files = walkDir(fullDir)
  for (const file of files) {
    lintFile(file)
  }
}

if (errors.length > 0) {
  console.error('CONTENT LINT FAILED\n')
  console.error(`Found ${errorCount} violation(s):\n`)
  errors.forEach(e => console.error(e))
  console.error('\nRefer to the BBI Argentina Brand Voice & Style Guide for approved vocabulary.')
  process.exit(1)
} else {
  console.log(`Content lint passed. No prohibited terms or punctuation found.`)
  process.exit(0)
}
