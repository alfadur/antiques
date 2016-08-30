abstract class TextView()
{
    companion object
    {
        val fontSize = 14
        val font = "${fontSize}pt Cursive"
    }
}

class ListView(val dialog: Dialog, val items: List<String>,
               val cursorTexture: PIXI.Texture,
               val scrollerTexture: PIXI.Texture,
               val selectorTexture: PIXI.Texture): TextView()
{
    companion object
    {
        val cursorColor = "orange"
        val selectedColor = "khaki"
        val unselectedColor = "whitesmoke"
    }

    var scrollPosition = 0
    var cursorPosition = 0

    val lineHeight = fontSize * 1.5
    val displayCount = dialog.clientHeight.div(lineHeight.toInt())

    val selectedIndices: List<Int>
        get() = selection.toList()

    private val selection = arrayListOf<Int>()

    private val cursorStyle =
        TextStyle(fill = cursorColor, wordWrap = false, font = font)
    private val selectedStyle =
        TextStyle(fill = selectedColor, wordWrap = false, font = font)
    private val unselectedStyle =
        TextStyle(fill = unselectedColor, wordWrap = false, font = font)

    private val lines = (0..displayCount - 1).map {
        PIXI.Text("", unselectedStyle).apply {
            position = PIXI.Point(0, it * lineHeight)
        }
    }
    private val selectorBatch = PIXI.SpriteBatch()

    private val selectors = lines.indices.map {
        PIXI.Sprite(selectorTexture).apply {
            position = PIXI.Point(0, it * lineHeight)
            width = fontSize
            height = fontSize
            visible = false
        }
    }

    private val cursor: PIXI.Sprite
    private val scroller: PIXI.Sprite

    init
    {
        selectors.forEach { selectorBatch.addChild(it) }
        dialog.add(selectorBatch)
        lines.forEach { dialog.add(it) }

        cursor = PIXI.Sprite(cursorTexture)

        with(cursor)
        {
            width = fontSize
            height = fontSize
        }

        dialog.add(cursor)

        scroller = PIXI.Sprite(scrollerTexture)
        if (items.size > displayCount)
        {
            dialog.add(scroller)
        }


        update()
    }

    fun update()
    {
        for ((i, selector) in selectors.withIndex())
        {
            selector.visible = i + scrollPosition in selection
        }

        val items = items.drop(scrollPosition).take(displayCount)
        for ((i, line) in lines.withIndex())
        {
            val index = i + scrollPosition

            val isUnderCursor = cursorPosition == index
            val isSelected = isUnderCursor || index in selection

            val offset = if (isSelected) fontSize * 1.2 else 0.0
            val itemStyle = when
            {
                isUnderCursor -> cursorStyle
                isSelected -> selectedStyle
                else -> unselectedStyle
            }

            with(line)
            {
                text = items.getOrNull(i) ?: ""
                setStyle(itemStyle)
                position = PIXI.Point(offset, i * lineHeight)
            }
        }

        cursor.position = PIXI.Point(0, (cursorPosition - scrollPosition) * lineHeight)

        val scrollProgress =
            (dialog.clientHeight - scroller.height.toDouble()) *
                scrollPosition.toDouble() / (items.size - 1)
        scroller.position = PIXI.Point(dialog.clientWidth - scroller.width.toDouble() / 2, scrollProgress)
    }

    fun moveCursor(shift: Int): Boolean
    {
        val newPosition =
            (cursorPosition + shift).clamp(0, items.lastIndex)
        if (cursorPosition != newPosition)
        {
            cursorPosition = newPosition
            scrollPosition = scrollPosition.clamp(cursorPosition - displayCount + 1, cursorPosition)
            update()
            return true
        }
        return false
    }

    fun toggleSelection()
    {
        if (selection.contains(cursorPosition))
        {
            selection.remove(cursorPosition)
        }
        else
        {
            selection.add(cursorPosition)
        }
        update()
    }
}

class PropertyView(val dialog: Dialog): TextView()
{
    private var _entry: Entry?  = null

    val lineHeight = fontSize * 1.6

    var entry: Entry?
        get() = _entry
        set(v)
        {
            if (_entry != v)
            {
                _entry = v
                update()
            }
        }

    private val style =
        TextStyle(fill = "wheat", wordWrap = false, font = font)

    private val texts = arrayListOf<PIXI.Text>()

    init
    {
        val text =dialog.add(
            PIXI.Text("Properties", style).apply {
            })
        center(text)
    }

    private fun center(item: PIXI.DisplayObject)
    {
        item.position = PIXI.Point((dialog.clientWidth - item.width.toDouble()) / 2.0, item.position.y)
    }

    private fun update()
    {
        texts.forEach { dialog.remove(it) }
        val entry = _entry
        if (entry != null)
        {
            if (entry.properties.isNotEmpty())
            {
                for ((i, property) in entry.properties.withIndex())
                {
                    texts.add(dialog.add(
                        PIXI.Text(property.propertyName(), style).apply {
                            position = PIXI.Point(0, (i * 3 + 2) * lineHeight)
                        }))

                    texts.add(dialog.add(
                        PIXI.Text(property.toString(), style).apply {
                            position = PIXI.Point(fontSize * 1.5, (i * 3 + 3) * lineHeight)
                        }))
                }
            }
            else
            {
                val text = dialog.add(
                    PIXI.Text("<None>", style).apply {
                        position = PIXI.Point(0, 2 * lineHeight)
                    })
                center(text)
                texts.add(text)
            }
        }

    }
}
