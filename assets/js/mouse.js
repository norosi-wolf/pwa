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
	}

	dispose = () =>
	{
		document.removeEventListener("mousedown", this._handleMousedown);
		document.removeEventListener("mouseup", this._handleMouseup);
		document.removeEventListener("mousemove", this._handleMousemove);
	}

	update()
	{
		this._old_x = this._x;
		this._old_y = this._y;
	}

	_handleMousedown = (e) =>
	{
		this._is_down = true;
	}
	_handleMouseup = (e) =>
	{
		this._is_down = false;
	}
	_handleMousemove = (e) =>
	{
		this._old_x = this._x;
		this._old_y = this._y;
		this._x = e.pageX;
		this._y = e.pageY;
	}

	getPosX() { return this._x; }
	getPosY() { return this._y; }
	getOldPosX() { return this._old_x; }
	getOldPosY() { return this._old_y; }
	isDown() { return this._is_down; }
};

