import kotlin.browser.document
import kotlin.browser.window

object Messages
{
    val introMessage =
        "Welcome to your new position! Our company has been the market leader in historical reconstructions " +
        "since 2194. Your job today is to make a selection from a catalog of antique items " +
        "for us to scan and use in reconstruction of various scenes set in 2016. For this purpose, " +
        "we've prepared a UI " +
        "resembling those that our history consultant claims were used during the target time period.\n\n" +
        "Use <Arrows> or <WASD> to navigate menus and <Enter> for selection."

    val taskMessages = listOf(
        "Please select 4 antique items from around 2016, ensuring that they all have different color.",
        "Please select 6 antique items from around 2016, ensuring that their " +
            "total weight is no more than 15 kg."
    )
}

enum class GameFlowState
{
    TaskSelection,
    TaskConfirmation,
    TaskCompletion,
    FeedbackConfirmation
}

class Game()
{
    val screenWidth = 520
    val screenHeight = 420

    val renderer = PIXI.CanvasRenderer(screenWidth, screenHeight)
    val stage = PIXI.Stage(0x000088)

    val controller = KeyboardController(window)
    var gameStage: GameStage

    var flow = GameFlowState.TaskSelection
    var taskIndex = 0

    val background = PIXI.BaseTexture.fromImage("images/background.png", false)

    val iconsTextures = with(PIXI.BaseTexture.fromImage("images/tiles.png", false))
    {
        val tileSize = 40
        val list = arrayListOf<PIXI.Texture>()
        for (i in 0..2)
        {
            val x = (i.mod(2)) * tileSize
            val y = (i.div(2)) * tileSize
            val texture = PIXI.Texture(this, PIXI.Rectangle(x, y, tileSize, tileSize))
            list.add(texture)
        }
        list
    }

    val windowTexture = PIXI.BaseTexture.fromImage("images/window.png", false)
    val gameSize = Point(screenWidth, screenHeight)

    init
    {
        document.getElementById("game")?.appendChild(renderer.view)

        window.requestAnimationFrame { update() }

        val b = PIXI.Sprite(
            PIXI.Texture(background, PIXI.Rectangle(0, 0, screenWidth, screenHeight)))

        stage.addChild(b)
        gameStage = createMenuStage()
        stage.addChild(gameStage.root)
    }

    fun checkResult(result: List<Entry>, taskIndex: Int): String
    {
        val error = when (taskIndex)
        {
            0 ->
            {
                when
                {
                    result.size < 4 ->
                        "Less than 4 items were selected."
                    result.any{ !it.isAncient } ->
                        "Some items do not seem to be from the target time period."
                    result.any{ it.properties.all{ it !is Color } } ->
                        "Some items do not have a defined color."
                    result.distinctBy{ it.properties.firstOrNull{ it is Color } }.size < result.size ->
                        "Some items have the same color."
                    else -> null
                }
            }

            1 ->
            {
                when
                {
                    result.size < 6 ->
                        "Less than 6 items were selected."
                    result.any{ !it.isAncient } ->
                        "Some items do not seem to be from the target time period."
                    result.any{ it.properties.all{ it !is Weight } } ->
                        "Some items do not have a defined weight."
                    result.sumBy{ (it.properties.first{ it is Weight } as Weight).value } > 15 ->
                        "Total items' weight is more than 15 kg."
                    else -> null
                }
            }
            else -> null
        }
        return if (error != null)
            "There was an issue with your selection:\n\n$error"
        else
            "You've successfully completed the task.\nThank you for your time."
    }

    fun createMenuStage() =
        MenuStage(gameSize, Messages.introMessage,
                  listOf("Task 1", "Task 2"),
                  windowTexture, iconsTextures)

    fun createTaskStage(taskIndex: Int) =
        MenuStage(gameSize,
                  Messages.taskMessages[taskIndex],
                  listOf("Begin Task", "Back to Menu"),
                  windowTexture, iconsTextures)

    fun createFeedbackStage(message: String) =
        MenuStage(gameSize,
                  message,
                  listOf("Back to Menu"),
                  windowTexture, iconsTextures)

    fun switchStage(newStage: GameStage)
    {
        stage.removeChild(gameStage.root)
        stage.addChild(newStage.root)
        gameStage = newStage
    }

    fun update()
    {
        gameStage.handleController(controller)
        gameStage.update()

        when (flow)
        {
            GameFlowState.TaskSelection ->
            {
                val selection = (gameStage as? MenuStage)?.selection
                if (selection != null)
                {
                    switchStage(createTaskStage(selection))
                    flow = GameFlowState.TaskConfirmation
                    taskIndex = selection
                }
            }
            GameFlowState.TaskConfirmation ->
            {
                val selection = (gameStage as? MenuStage)?.selection
                when (selection)
                {
                    0 ->
                    {
                        switchStage(IngameStage(gameSize, windowTexture, iconsTextures))
                        flow = GameFlowState.TaskCompletion
                    }
                    1 ->
                    {
                        switchStage(createMenuStage())
                        flow = GameFlowState.TaskSelection
                    }
                }
            }
            GameFlowState.TaskCompletion ->
            {
                val result = (gameStage as? IngameStage)?.result
                if (result != null)
                {
                    switchStage(createFeedbackStage(checkResult(result, taskIndex)))
                    flow = GameFlowState.FeedbackConfirmation
                }
            }
            GameFlowState.FeedbackConfirmation ->
            {
                val selection = (gameStage as? MenuStage)?.selection
                if (selection != null)
                {
                    switchStage(createMenuStage())
                    flow = GameFlowState.TaskSelection
                }
            }
        }

        renderer.render(stage)
        window.requestAnimationFrame { update() }
    }
}

fun main(args: Array<String>)
{
    window.onload =
    {
        Game()
    }
}