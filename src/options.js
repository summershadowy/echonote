document.addEventListener('DOMContentLoaded', function () {
    const apiUrlInput = document.getElementById('api-url');
    const saveButton = document.getElementById('save-button');

    // 加载保存的API URL
    chrome.storage.sync.get('apiUrl', function (data) {
        apiUrlInput.value = data.apiUrl || '';
    });

    // 保存API URL
    saveButton.addEventListener('click', () => {
        const apiUrl = apiUrlInput.value;
        chrome.storage.sync.set({ apiUrl }, () => {
            console.log('API URL 保存成功');
        });
    });
});
