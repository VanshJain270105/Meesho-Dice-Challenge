const axios = require('axios');
const { createGunzip } = require('zlib');
const parser = require('sitemap-stream-parser');

module.exports = async (req, res) => {
    try {
        // Specify the URL of your website
        const websiteUrl = 'https://meesho-colone.vercel.app';

        // Fetch the HTML content of your website
        const response = await axios.get(websiteUrl);

        // Parse the HTML to extract URLs (you may need to adjust this based on your website structure)
        const htmlContent = response.data;
        const urls = extractUrlsFromHtml(htmlContent);

        // Generate a sitemap XML string
        const sitemapXML = generateSitemapXML(websiteUrl, urls);

        // Set the content type and send the sitemap as the response
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(sitemapXML);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function extractUrlsFromHtml(htmlContent) {
    // Implement your logic to extract URLs from HTML content
    // This can be done using a library like cheerio or any other method suitable for your website structure
    // For simplicity, let's assume we have a simple function for demonstration
    return ['profile', 'products']; // Replace with actual URLs
}

function generateSitemapXML(websiteUrl, urls) {
    // Implement your logic to generate a sitemap XML string
    // This can be done using a library like sitemap or manually constructing the XML
    // For simplicity, let's assume we have a simple function for demonstration
    const xmlContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `<url><loc>${websiteUrl}/${url}</loc></url>`).join('')}
    </urlset>
  `;

    return xmlContent.trim(); // Trim leading whitespaces
}
