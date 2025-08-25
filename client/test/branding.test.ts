import fs from 'fs';
import path from 'path';

// Import the English locale JSON to verify Allison branding appears in key strings
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - JSON import without type
import en from '../src/locales/en/translation.json';

describe('Allison branding', () => {
  test('index.html title is Allison', () => {
    const indexPath = path.resolve(__dirname, '..', 'index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    expect(html).toMatch(/<title>\s*Allison\s*<\/title>/);
  });

  test('English locale shows Allison in key branding values', () => {
    expect(en['com_agents_by_librechat']).toContain('Allison');
    expect(en['com_agents_code_interpreter']).toContain('Allison');
    expect(en['com_agents_mcp_trust_subtext']).toContain('Allison');
    expect(en['com_ui_librechat_code_api_key']).toContain('Allison');
  });
});
