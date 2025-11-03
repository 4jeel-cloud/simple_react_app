# IP Info Dashboard

A simple React webapp that displays your public IP address and geolocation information.

## Features

- 🌐 Shows your public IP address (IPv4/IPv6)
- 📍 Displays location information (city, country, region)
- 🏢 Shows ISP and network details
- 🕐 Timezone information
- 💰 Currency and language info
- 📱 Fully responsive design
- ⚡ Static build ready for S3 hosting

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm start
```

### Build for Production (S3 Hosting)
```bash
npm run build
```

The `build` folder will contain all static files ready for S3 upload.

## S3 Hosting Setup

1. Run `npm run build`
2. Upload the contents of the `build` folder to your S3 bucket
3. Enable static website hosting on your S3 bucket
4. Set `index.html` as the index document

## API Used

This app uses the free tier of ipapi.co for IP geolocation data.

## Browser Support

Works on all modern browsers that support ES6+ and React 18.