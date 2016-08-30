class Dialog(val externalContainer: PIXI.DisplayObjectContainer, val width: Int, val height: Int, val texture: PIXI.BaseTexture)
{
    val side = 20
    val tileSize = 20

    val textures = texture.slice(side, tileSize, side)

    val actualWidth: Int
    val actualHeight: Int

    val clientWidth: Int
    val clientHeight: Int

    private val background = PIXI.SpriteBatch()
    private val container = PIXI.DisplayObjectContainer()
    private val clientContainer = PIXI.DisplayObjectContainer()

    constructor(externalContainer: PIXI.DisplayObjectContainer, size: PIXI.Rectangle, texture: PIXI.BaseTexture):
        this(externalContainer, size.width.toInt(), size.height.toInt(), texture)
    {
        position = PIXI.Point(size.x, size.y)
    }

    init
    {
        val xTiles = (width - side * 2).div(tileSize)
        val yTiles = (height - side * 2).div(tileSize)

        actualWidth = xTiles * tileSize + side * 2
        actualHeight = yTiles * tileSize + side * 2

        clientWidth = actualWidth - side * 2
        clientHeight = actualHeight - side * 2

        val offsetX = (width - actualWidth) / 2
        val offsetY = (height - actualHeight) / 2

        addSprite(0, 0, textures[0])
        addSprite(actualWidth - side, 0, textures[2])
        addSprite(0, actualHeight - side, textures[6])
        addSprite(actualWidth - side, actualHeight - side, textures[8])

        for (x in 0..xTiles - 1)
        {
            addSprite(side + x * tileSize, 0, textures[1])
            addSprite(side + x * tileSize, actualHeight - side, textures[7])
        }

        for (y in 0..yTiles - 1)
        {
            addSprite(0, side + y * tileSize, textures[3])
            addSprite(actualWidth - side, side + y * tileSize, textures[5])
        }

        for (x in 0..xTiles - 1)
        {
            for (y in 0..yTiles - 1)
            {
                addSprite(side + x * tileSize, side + y * tileSize, textures[4])
            }
        }

        background.position = PIXI.Point(offsetX, offsetY)
        container.addChild(background)
        clientContainer.position = PIXI.Point(side + offsetX, side + offsetY)

        container.addChild(clientContainer)
        externalContainer.addChild(container)

        container.position
    }

    var position: PIXI.Point
        get() = container.position
        set(v) { container.position = v}

    fun <T: PIXI.DisplayObject> add(d: T): T
    {
        clientContainer.addChild(d)
        return d
    }

    fun <T: PIXI.DisplayObject> remove(it: T)
    {
        clientContainer.removeChild(it)
    }

    fun close()
    {
        externalContainer.removeChild(container)
    }

    private fun addSprite(x: Int, y: Int, texture: PIXI.Texture)
    {
        val sprite = PIXI.Sprite(texture)
        sprite.position = PIXI.Point(x, y)
        background.addChild(sprite)
    }
}

