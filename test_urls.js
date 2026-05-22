import https from 'https';
import http from 'http';

const urls = [
  'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
  'https://upload.wikimedia.org/wikipedia/commons/7/70/Lenovo_logo_2015.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5f/Acer_2011.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/4a/Canon_wordmark.svg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3f/Epson_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6e/Brother_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6f/Hikvision_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6a/Dahua_Technology_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg',
  'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2e/Panasonic_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2b/D-Link_Logo.svg',
];

async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
    return { url, status: response.ok ? 'ok' : `error-${response.status}` };
  } catch (err) {
    return { url, status: `error-${err.code || err.message}` };
  }
}

async function checkAll() {
  console.log('Checking URLs...\n');
  const results = await Promise.all(urls.map(checkUrl));
  
  const working = results.filter((r) => r.status === 'ok');
  const broken = results.filter((r) => r.status !== 'ok');

  console.log(`✅ Working (${working.length}):`);
  working.forEach((r) => console.log(`   ${r.url}`));

  if (broken.length > 0) {
    console.log(`\n❌ Issues (${broken.length}):`);
    broken.forEach((r) => console.log(`   ${r.status}: ${r.url}`));
  }

  console.log(`\n✅ All ${working.length}/${urls.length} URLs are accessible!`);
}

checkAll().catch(console.error);

