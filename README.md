# Web Scraper for Jumbo.cl Authentication

## Requirements

    Node.js (version 17 or higher)
    Puppeteer
    Puppeteer-extra
    Puppeteer-extra-plugin-stealth
    dotenv

Create a .env file in the root directory of the project and add your credentials as shown below:

```
EMAIL=myemail@example.com
PASSWORD=mysecretpassword
```

# Running the script:

## Option 1: Run the script locally

This will by default run in a headful mode. The page doesn't render certain components when it's not.

Install dependencies:

```
npm install
```

Run the script:

```
node main.js
```

## Option 2: Run the script using Docker

This will run it in headful mode inside the container since there is a virtual display running inside. The benefit of this is that the page renders completely so bugs are less prone to appear and still is running headless to your eyes.

- Install Docker on your system if you haven't already. You can download it from the official Docker website.
- Build the Docker container by running the following command:

```
docker build -t jumbo-login .
```

Start the container with the running script:

```
docker run --rm -v "$(pwd)/output:/app/output" --name jumboauth jumbo-login
```
