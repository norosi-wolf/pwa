
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

function sendMail()
{
	address = 'test_adress@co.jp';
	subject = 'テスト件名';
	body = '本文テスト';
	location.href = 'mailto:' + address + '?subject=' + subject + '&body=' + body;
}

function removePWACache()
{
	navigator.serviceWorker.getRegistration()
		.then(registration => {
			registration.unregister();
		});
	window.location.reload(true);
}
