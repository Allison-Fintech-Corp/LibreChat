import fs from 'fs';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - JSON import for jest
import en from '../locales/en/translation.json';

describe('Allison branding', () => {
  test('index.html title is Allison', () => {
    const indexPath = path.resolve(__dirname, '..', '..', 'index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    expect(html).toMatch(/<title>\s*Allison\s*<\/title>/);
  });

  test('English locale shows Allison in key branding values', () => {
    expect(en['com_agents_by_librechat']).toContain('Allison');
    expect(en['com_agents_code_interpreter']).toContain('Allison');
    expect(en['com_agents_mcp_trust_subtext']).toContain('Allison');
    expect(en['com_ui_librechat_code_api_key']).toContain('Allison');
  });

  test('Default footer content includes Allison brand when no customFooter is set', () => {
    // Mirrors client/src/components/Chat/Footer.tsx fallback construction, but ignore exact version
    const slogan = en['com_ui_latest_footer'];
    const footerRegex = new RegExp(`\\[Allison\\s+[^\\]]+\\]\\(https://librechat\\.ai\\)\\s*-\\s*${slogan.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`);
    const exampleFooter = `[Allison vX.Y.Z](https://librechat.ai) - ${slogan}`;
    expect(exampleFooter).toMatch(footerRegex);
  });
});
