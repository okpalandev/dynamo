window.addEventListener('load', function() {
    const projectPath = 'src/';
    const entryPoint = 'src/main.js'; // Change this to your entry point file
    const bundleEndpoint = `http://localhost:3000/bundle?projectPath=${encodeURIComponent(projectPath)}&entryPoint=${encodeURIComponent(entryPoint)}`;

    fetch(bundleEndpoint)
        .then(response => response.text())
        .then(bundle => {
            eval(bundle);
        })
        .catch(error => console.error('Error fetching bundle:', error));
});