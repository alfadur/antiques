import org.w3c.dom.Window

enum class ControllerAction
{
    Up,
    Left,
    Right,
    Down,

    Select,
    Submit
}

interface Controller
{
    fun isActive(action: ControllerAction): Boolean
}

object RandomController: Controller
{
    private val ignoreActions = listOf(ControllerAction.Submit)

    override fun isActive(action: ControllerAction) =
        action !in ignoreActions && Math.random() >= 0.5
}

class KeyboardController(window: Window): Controller
{
    private val holdActionKeys = mapOf(
        ControllerAction.Select to intArrayOf())

    private val mixedActionKeys = mapOf(
        ControllerAction.Up to intArrayOf(),
        ControllerAction.Left to intArrayOf(),
        ControllerAction.Down to intArrayOf(),
        ControllerAction.Right to intArrayOf())

    private val pressActionKeys = mapOf(
        ControllerAction.Submit to intArrayOf(KeyCodes.Escape),
        ControllerAction.Select to intArrayOf(KeyCodes.Space, KeyCodes.Enter),
        ControllerAction.Up to intArrayOf(KeyCodes.Up, KeyCodes.W),
        ControllerAction.Left to intArrayOf(KeyCodes.Left, KeyCodes.A),
        ControllerAction.Down to intArrayOf(KeyCodes.Down, KeyCodes.S),
        ControllerAction.Right to intArrayOf(KeyCodes.Right, KeyCodes.D))

    private val isDown = hashSetOf<Int>()
    private val wasPressed = hashSetOf<Int>()
    private var continuousMode = true

    init
    {
        val isDown = isDown
        window.onkeydown =
        {
            if (it is KeyboardEvent)
            {
                isDown.add(it.keyCode)
                wasPressed.add(it.keyCode)

                if (it.keyCode == KeyCodes.P)
                {
                    continuousMode = !continuousMode
                    wasPressed.clear()
                }
            }
        }

        window.onkeyup =
        {
            if (it is KeyboardEvent)
            {
                isDown.remove(it.keyCode)
            }
        }
    }

    private fun checkHold(keys: IntArray?) =
        keys?.any{ isDown.contains(it)  } ?: false

    private fun retrieveFirst(keys: IntArray?): Boolean
    {
        for (key in keys ?: intArrayOf())
        {
            if (wasPressed.remove(key))
            {
                return true
            }
        }
        return false
    }

    override fun isActive(action: ControllerAction): Boolean =
        checkHold(holdActionKeys[action]) || retrieveFirst(pressActionKeys[action]) ||
            if (continuousMode)
                checkHold(mixedActionKeys[action])
            else
                retrieveFirst(mixedActionKeys[action])
}
