window.addEventListener('load', function() {
    const projectPath = 'src/';
    const entryPoint = 'src/main.js';
    const bundleEndpoint = `http://localhost:3000/dist?projectPath=${encodeURIComponent(projectPath)}&entryPoint=${encodeURIComponent(entryPoint)}`;
    console.log('Fetching bundle from:', bundleEndpoint);
    fetch(bundleEndpoint)
        .then(response => response.text())
        .then(bundle => {
            eval(bundle);
        })
        .catch(error => console.error('Error fetching bundle:', error));
});