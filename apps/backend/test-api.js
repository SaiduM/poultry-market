const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:5001/health');
    console.log('Health endpoint status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health data:', healthData);
    }
    
    // Test products endpoint
    const productsResponse = await fetch('http://localhost:5001/api/products');
    console.log('Products endpoint status:', productsResponse.status);
    
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log('Products count:', productsData.products?.length || 0);
      console.log('First product:', productsData.products?.[0]?.name || 'No products');
    } else {
      const errorText = await productsResponse.text();
      console.log('Error response:', errorText);
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAPI(); 