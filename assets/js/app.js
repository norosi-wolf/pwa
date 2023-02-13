
/**
 * 
 */
const WIDTH = 960;
const HEIGHT = 540;
const FPS = 30;
const SECOND_PER_FRAME = Math.floor(1000 / FPS);
const MOVE_SPEED = 0.6 / FPS;


////////////////////////////////////////////////////////////////////////////////
//
//
class App
{
	constructor()
	{
		this._camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
		this._renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#stage")});
		this._scene = new THREE.Scene();
		this._mouse = new Mouse();
		this._box = null;
		this._time = getNowTime();
		this._result = document.querySelector("#result");
		this._stats = new Stats();
	}

	dispose = () =>
	{
		cancelAnimationFrame(this.update);
	}

	start = () =>
	{
		this.initialize();
		this.update();
	}

	initialize = () =>
	{
		registServiceWorker();

		//
		this._renderer.setSize(WIDTH, HEIGHT);
		this._renderer.setPixelRatio(`window`.devicePixelRatio);
		this._renderer.setClearColor(new THREE.Color(0xfff8d4));

		//
		this._camera.position.set(0, 0, 1000);
		this._camera.lookAt(new THREE.Vector3(0, 0, 0));

		// 
		const texture = new THREE.TextureLoader().load('./assets/img/crate.gif');
		const geometry = new THREE.BoxGeometry(600, 400, 100);
		const material = new THREE.MeshBasicMaterial({map: texture});
		this._box = new THREE.Mesh(geometry, material);
		this._scene.add(this._box);

		// 
		const light_ambient = new THREE.AmbientLight( 0xffffff , 1 );
		this._scene.add(light_ambient);

		const light_direction = new THREE.DirectionalLight(0xffffff);
		light_direction.position.set(50, 10, 5); // ライトの方向
		light_direction.target = this._box;
		this._scene.add(light_direction);

		//
		this._stats.showPanel(0);
		Object.assign(this._stats.dom.style, {
			'position': 'fixed',
			'height': 'max-content',
			'left': 'auto',
			'right': 0,
			//'top': 'auto',
			//'bottom': '0'
		});
		document.body.appendChild(this._stats.dom);
	}

	update = () =>
	{
		requestAnimationFrame(this.update);

		let now = getNowTime();
		let dt = now - this._time;
		if (SECOND_PER_FRAME > dt) return;

		this._time = now;
		this._result.textContent = Math.floor(1000 / ((dt + Number(this._result.textContent)) / 2));

		// 測定開始
		this._stats.begin(); 

		// マウス
		if (this._mouse.isDown())
		{
			this._box.rotation.y -= (this._mouse.getOldPosX() - this._mouse.getPosX()) * MOVE_SPEED;
			this._box.rotation.x -= (this._mouse.getOldPosY() - this._mouse.getPosY()) * MOVE_SPEED;
		}
		this._mouse.update();
		
		// 描画
		this._renderer.render(this._scene, this._camera); 

		// 測定終了
		this._stats.end(); 
	}
}

function getNowTime()
{
	return new Date().getTime();
}

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


//let GlobalValue = {
//	camera: null,
//	renderer: null,
//	scene: null,
//	box: null,
//	mouse: null,
//}
//
//function initialize()
//{
//	// 
//	registServiceWorker();
//
//	// 
//	GlobalValue.mouse = new Mouse();
//
//	// 
//	GlobalValue.renderer = new THREE.WebGLRenderer({
//		canvas: document.querySelector("#stage")
//	});
//	GlobalValue.renderer.setSize(WIDTH, HEIGHT);
//	GlobalValue.renderer.setPixelRatio(`window`.devicePixelRatio);
//	GlobalValue.renderer.setClearColor(new THREE.Color(0xfff8d4));
//
//	// 
//	GlobalValue.scene = new THREE.Scene();
//	
//	
//	////////////////////////////////////////////////////////////////////////////////
//	// camera
//	//
//	GlobalValue.camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
//	GlobalValue.camera.position.set(0, 0, 1000);
//
//
//	////////////////////////////////////////////////////////////////////////////////
//	// box
//	// 
//	const texture = new THREE.TextureLoader().load('./crate.gif');
//	const geometry = new THREE.BoxGeometry(600, 400, 100);
//	//const material = new THREE.MeshStandardMaterial({color: 0x00a0e8});
//    const material = new THREE.MeshBasicMaterial({map: texture});
//	GlobalValue.box = new THREE.Mesh(geometry, material);
//	GlobalValue.scene.add(GlobalValue.box);
//
//	
//	////////////////////////////////////////////////////////////////////////////////
//	// light
//	// 
//	const light_ambient = new THREE.AmbientLight( 0xffffff , 1 );
//    GlobalValue.scene.add(light_ambient);
//
//	const light_direction = new THREE.DirectionalLight(0xffffff);
//	light_direction.position.set(50, 10, 5); // ライトの方向
//	light_direction.target = GlobalValue.box;
//	GlobalValue.scene.add(light_direction);
//	
//
//	// draw
//	GlobalValue.renderer.render(GlobalValue.scene, GlobalValue.camera);
//
//
//	/*
//	createStarField();
//	function createStarField()
//	{
//		let vertices = [];
//		for (let i = 0; i < 1000; i++)
//		{
//			vertices.push(new THREE.Vector3(3000 * (Math.random() - 0.5), 3000 * (Math.random() - 0.5), 3000 * (Math.random() - 0.5)));
//		}
//
//		const geometry = new THREE.BufferGeometry();
//		geometry.setFromPoints(vertices);
//
//		//
//		const material = new THREE.PointsMaterial({size: 10, color: 0xffffff});
//		const mesh = new THREE.Points(geometry, material);
//		GlobalValue.scene.add(mesh);
//	}
//	*/
//
//	// update
//	update();
//}
//
//function update()
//{
//	//const targetRot = (0 / window.innerWidth) * 360 * 2;
//	//GlobalValue.rotate += (targetRot - GlobalValue.rotate);// * 0.02;
//  
//	//
//	//const radian = GlobalValue.rotate * Math.PI / 180;
//	//GlobalValue.camera.position.x = 1500 * Math.sin(radian);
//	//GlobalValue.camera.position.z = 1500 * Math.cos(radian);
//	
//
//	//
//	GlobalValue.camera.lookAt(new THREE.Vector3(0, 0, 0));
//	GlobalValue.renderer.render(GlobalValue.scene, GlobalValue.camera);  
//
//	//
//	if (GlobalValue.mouse.isDown())
//	{
//		GlobalValue.box.rotation.y -= (GlobalValue.mouse.getOldPosX() - GlobalValue.mouse.getPosX()) * 0.005;
//		GlobalValue.box.rotation.x -= (GlobalValue.mouse.getOldPosY() - GlobalValue.mouse.getPosY()) * 0.005;
//	}
//	GlobalValue.mouse.update();
//
//	
//	requestAnimationFrame(update);
//}


