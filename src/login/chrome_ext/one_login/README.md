# Updating Chrome Extension for Playwright

- Install extension using normal browser (IE: `OneLogin`)
- Locate extension id in `chrome://extensions/`. Should look like this: `ioalpmibngobedobkmbhgmadaphocjdn`
- `cd` into: `~/Library/Application Support/Google/Chrome`
- Search for above extension id directory: `find ./ -type d -name “{ext_id}”`
- Look for: `./Profile {name_or_number}/Extensions/{ext_id}`
- cd into it, you should see a version number. IE: `4.0.11_0`
- Copy the whole directory into `./{project_root}/chrome_ext/{ext_name}/{version_number}`. IE: `./{project_root}/chrome_ext/onelogin/4.0.11_0`

NOTE: you can install a Chrome extension from the Chrome Store & load it in to Chromium also.
