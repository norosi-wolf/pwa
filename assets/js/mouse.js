class Mouse
{
	constructor()
	{
		this._x = -1;
		this._y = -1;
		this._old_x = -1;
		this._old_y = -1;
		this._is_down = false;
		
		document.addEventListener("mousedown", this._handleMousedown);
		document.addEventListener("mouseup", this._handleMouseup);
		document.addEventListener("mousemove", this._handleMousemove);
		
		document.addEventListener("touchstart", this._handleMousedown);
		document.addEventListener("touchend", this._handleMouseup);
		document.addEventListener("touchmove", this._handleMousemove);

		//document.addEventListener('touchmove', this._noscroll, {passive: false});
	}

	dispose = () =>
	{
		document.removeEventListener("mousedown", this._handleMousedown);
		document.removeEventListener("mouseup", this._handleMouseup);
		document.removeEventListener("mousemove", this._handleMousemove);

		document.removeEventListener("touchstart", this._handleMousedown);
		document.removeEventListener("touchend", this._handleMouseup);
		document.removeEventListener("touchmove", this._handleMousemove);

		//document.removeEventListener('touchmove', this._noscroll);
	}

	update()
	{
		this._old_x = this._x;
		this._old_y = this._y;
	}

	_noscroll(e)
	{
		e.preventDefault();
	}

	_handleMousedown = (e) =>
	{
		this._is_down = true;
		console.log("down");
	}
	_handleMouseup = (e) =>
	{
		this._is_down = false;
		console.log("up");
	}
	_handleMousemove = (e) =>
	{
		e.preventDefault();

		this._old_x = this._x;
		this._old_y = this._y;
		this._x = e.pageX == undefined ? e.changedTouches[0].pageX : e.pageX;;
		this._y = e.pageY == undefined ? e.changedTouches[0].pageY : e.pageY;
	}

	getPosX() { return this._x; }
	getPosY() { return this._y; }
	getOldPosX() { return this._old_x; }
	getOldPosY() { return this._old_y; }
	isDown() { return this._is_down; }
};

