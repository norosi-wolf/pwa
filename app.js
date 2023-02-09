
function registServiceWorker()
{
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js').then(reg => {
			console.log('サービスワーカーを登録しました', reg);
		}).catch(err => {
			console.log('登録失敗', err);
		});
	}
}

