# SignalR Experiment
1. Run Webpack in release mode by executing the following command in the project root:

`npm run release`
This command yields the client-side assets to be served when running the app. The assets are placed in the wwwroot folder.

Webpack completed the following tasks:

- Purged the contents of the wwwroot directory.
- Converted the TypeScript to JavaScript—a process known as transpilation.
- Mangled the generated JavaScript to reduce file size—a process known as minification.
- Copied the processed JavaScript, CSS, and HTML files from src to the wwwroot directory.
- Injected the following elements into the wwwroot/index.html file:
  - A <link> tag, referencing the wwwroot/main.<hash>.css file. This tag is placed immediately before the closing </head> tag.
  - A <script> tag, referencing the minified wwwroot/main.<hash>.js file. This tag is placed immediately before the closing </body> tag.

2. Build and run the app by executing the following command in the project root:

`dotnet run`
The web server starts the app and makes it available on localhost.

3. Open a browser to `http://localhost:<port_number>`. The wwwroot/index.html file is served. Copy the URL from the address bar.

4. Open another browser instance (any browser). Paste the URL in the address bar.

5. Choose either browser, type something in the **Message** text box, and click the **Send** button. The unique user name and message are displayed on both pages instantly.