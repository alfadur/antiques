interface GameStage
{
    fun handleController(controller: Controller)
    fun update()

    val root: PIXI.DisplayObject
    val gameSize: Point

    fun section(x: ClosedRange<Double>, y: ClosedRange<Double>) =
        PIXI.Rectangle(x.start * gameSize.x, y.start * gameSize.y,
                       x.length * gameSize.x, y.length * gameSize.y)
}

class IngameStage(override val gameSize: Point,
                  window: PIXI.BaseTexture,
                  icons: List<PIXI.Texture>): GameStage
{
    val container = PIXI.DisplayObjectContainer()
    val list: ListView
    val property: PropertyView

    var result: List<Entry>? = null

    val weightText: PIXI.Text

    init
    {
        val split = 0.625

        val d1 = Dialog(container, section(0.0..split, 0.0..0.85), window)
        val d2 = Dialog(container, section(split..1.0, 0.0..0.85), window)
        val d3 = Dialog(container, section(0.0..1.0, 0.825..1.0), window)

        list = ListView(d1, Data.entries.map{ it.name },
                        icons[1],
                        icons[2],
                        icons[0])

        property = PropertyView(d2)
        property.entry = Data.entries[0]

        val messageStyle =
            TextStyle(fill = "blanchedalmond",
                      wordWrap = false,
                      font = TextView.font)

        weightText = PIXI.Text("Total Weight: 0 kg", messageStyle)

        d3.add(weightText)
        d3.add(PIXI.Text("<ESC> to confirm selection", messageStyle).apply {
            position = PIXI.Point(d3.clientWidth - this.width.toDouble(), 0)
        })
    }

    override fun handleController(controller: Controller)
    {
        when
        {
            controller.isActive(ControllerAction.Up) -> list.moveCursor(-1)
            controller.isActive(ControllerAction.Down) -> list.moveCursor(1)
            controller.isActive(ControllerAction.Left) -> list.moveCursor(-list.displayCount)
            controller.isActive(ControllerAction.Right) -> list.moveCursor(list.displayCount)
            controller.isActive(ControllerAction.Select) ->
            {
                list.toggleSelection()
                val items = list.selectedIndices.map {Data.entries[it]}

                if (items.all{ it.properties.any{ it is Weight }})
                {
                    val weight = items.sumBy{ (it.properties.first{ it is Weight } as Weight).value }
                    weightText.text = "Total Weight: $weight kg"
                }
                else
                {
                    weightText.text = "Total Weight: Unknown"
                }
                weightText.setStyle(weightText.style!!)

            }
            controller.isActive(ControllerAction.Submit) ->
                result = list.selectedIndices.map { Data.entries[it] }
        }
    }

    override fun update()
    {
        property.entry = Data.entries[list.cursorPosition]
    }

    override val root: PIXI.DisplayObject
        get() = container
}

class MenuStage(override val gameSize: Point,
                message: String,
                choices: List<String>,
                window: PIXI.BaseTexture,
                icons: List<PIXI.Texture>): GameStage
{
    val container = PIXI.DisplayObjectContainer()

    val list: ListView

    var selection: Int? = null

    init
    {
        val d = Dialog(container, section(0.0..1.0, 0.0..0.8), window)
        val messageStyle = TextStyle(fill = "blanchedalmond",
                                     wordWrap = true,
                                     wordWrapWidth = d.clientWidth,
                                     font = TextView.font)

        d.add(PIXI.Text(message, messageStyle).apply {
            position = PIXI.Point(0, 0)
        })

        val menu = Dialog(container, section(0.3..0.7, 0.65..0.95), window)
        list = ListView(menu, choices,
                        icons[1],
                        icons[2],
                        icons[0])
    }

    override fun handleController(controller: Controller)
    {
        when
        {
            controller.isActive(ControllerAction.Up)
                || controller.isActive(ControllerAction.Left) -> list.moveCursor(-1)

            controller.isActive(ControllerAction.Down)
                || controller.isActive(ControllerAction.Right)-> list.moveCursor(list.displayCount)

            controller.isActive(ControllerAction.Select) ->
            {
                selection = list.cursorPosition
            }
        }
    }

    override fun update()
    {

    }

    override val root = container
}
