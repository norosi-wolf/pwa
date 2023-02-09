
let GlobalValue = {
	mouse_x: 0,
	mouse_y: 0,
	rotate: 0,
	camera: null,
	renderer: null,
	scene: null,
}

function initialize()
{
	document.addEventListener("mousemove", (event) => {
		GlobalValue.mouse_x = event.pageX;
		GlobalValue.mouse_y = event.pageY;
	});

	registServiceWorker();

	const width = 960;
	const height = 540;

	GlobalValue.renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector("#stage")
	});
	GlobalValue.renderer.setSize(width, height);
	GlobalValue.renderer.setPixelRatio(`window`.devicePixelRatio);

	GlobalValue.scene = new THREE.Scene();
	
	// camera
	GlobalValue.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	GlobalValue.camera.position.set(0, 0, 1000);

	//
	//var controls = new THREE.OrbitControls(camera);

	// box
	const geometry = new THREE.BoxGeometry(500, 500, 500);
	const material = new THREE.MeshStandardMaterial({
		color: 0x0000ff
	});
	const box = new THREE.Mesh(geometry, material);
	GlobalValue.scene.add(box);
	
    //box.rotation.x = 40.1;
    //box.rotation.y = 40.1;

	// light
	const light = new THREE.DirectionalLight(0xffffff);
	//light.intensity = 2; // 光の強さを倍に
	light.position.set(1, 1, 1); // ライトの方向
	GlobalValue.scene.add(light);
	
	// draw
	GlobalValue.renderer.render(GlobalValue.scene, GlobalValue.camera);


	createStarField();
	function createStarField()
	{
		let vertices = [];
		for (let i = 0; i < 1000; i++)
		{
			vertices.push(new THREE.Vector3(3000 * (Math.random() - 0.5), 3000 * (Math.random() - 0.5), 3000 * (Math.random() - 0.5)));
		}
		
		const geometry = new THREE.BufferGeometry();
		geometry.setFromPoints(vertices);

		//
		const material = new THREE.PointsMaterial({size: 10, color: 0xffffff});
		const mesh = new THREE.Points(geometry, material);
		GlobalValue.scene.add(mesh);
	}

	// update
	tick();
}

function tick()
{
	const targetRot = (GlobalValue.mouse_x / window.innerWidth) * 360 * 2;
	GlobalValue.rotate += (targetRot - GlobalValue.rotate);// * 0.02;
  
	//
	const radian = GlobalValue.rotate * Math.PI / 180;
	GlobalValue.camera.position.x = 1500 * Math.sin(radian);
	GlobalValue.camera.position.z = 1500 * Math.cos(radian);

	//
	GlobalValue.camera.lookAt(new THREE.Vector3(0, 0, 0));
	GlobalValue.renderer.render(GlobalValue.scene, GlobalValue.camera);  
	requestAnimationFrame(tick);
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
