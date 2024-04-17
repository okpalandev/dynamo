window.addEventListener('load', function() {
    const mainScript = document.querySelector('script[data-main]');
    const entryPoint = mainScript.getAttribute('data-main');

    const projectPath = './src/';
    const bundleEndpoint = `http://localhost:3000/dist?projectPath=${encodeURIComponent(projectPath)}&entryPoint=${encodeURIComponent(entryPoint)}`;
    console.log('Fetching bundle from:', bundleEndpoint);
    fetch(bundleEndpoint)
        .then(response => response.text())
        .then(bundle => {
            console.log(bundle);
            new Function(bundle)();
        })
        .catch(error => console.error('Error fetching bundle:', error));
});
