import kotlin.reflect.KParameter

interface EntryProperty
{
    fun propertyName(): String
}

enum class Color: EntryProperty
{
    Black,
    Red,
    Yellow,
    Blue,
    Green,
    Grey,
    White;

    override fun propertyName() = "Color"
}

data class Weight(val value: Int): EntryProperty
{
    override fun toString() = "$value kg"
    override fun propertyName() = "Weight"
}

enum class EntryKind: EntryProperty
{
    Furniture,
    Storage,
    Data,
    Equipment,
    Apparel;

    override fun propertyName() = "Usage"
}

data class Entry(val name: String,
                 val isAncient: Boolean,
                 val properties: List<EntryProperty> = listOf())

object Data
{
    val baseEntries = listOf(
        Entry("SSD Drive", isAncient = true, properties = listOf(
            Color.Red, Weight(1), EntryKind.Storage
        )),
        Entry("HDMI Cable", isAncient = true, properties = listOf(
            Color.Black, Weight(1), EntryKind.Equipment
        )),
         Entry("LED TV", isAncient = true, properties = listOf(
            Color.Black, Weight(10), EntryKind.Equipment
        )),
        Entry("LED TV", isAncient = true, properties = listOf(
            Color.White, Weight(12), EntryKind.Equipment
        )),
        Entry("Portable Black Hole", isAncient = false, properties = listOf(
            Color.Black, EntryKind.Storage
        )),
        Entry("Nanofiber Sofa", isAncient = false, properties = listOf(
            Weight(2), EntryKind.Furniture
        )),
        Entry("Ancient Scythe of Corruption", isAncient = false, properties = listOf(
            EntryKind.Apparel, Weight(27)
        )),
        Entry("Elemental Scale Mail", isAncient = false, properties = listOf(
            EntryKind.Apparel, Weight(15)
        )),
        Entry("Medium FTL Engine", isAncient = false, properties = listOf(
            Weight(1000), EntryKind.Equipment, Color.Yellow
        )),
        Entry("Anti-Gravitation Boots", isAncient = false, properties = listOf(
            Color.Blue, Weight(-153), EntryKind.Apparel
        )),
        Entry("Blackboard", isAncient = true, properties = listOf(
            Color.Green, Weight(30), EntryKind.Furniture
        )),
        Entry("Steam Turbine", isAncient = true, properties = listOf(
            Color.Grey, Weight(20000), EntryKind.Equipment
        )),
        Entry("Electric Kettle", isAncient = true, properties = listOf(
            Color.Red, Weight(3), EntryKind.Equipment
        )),
        Entry("Wooden Cupboard", isAncient = true, properties = listOf(
            Color.Yellow, Weight(40), EntryKind.Storage, EntryKind.Furniture
        )),
        Entry("USB Flash Drive", isAncient = true, properties = listOf(
            Color.Green, Weight(1), EntryKind.Storage
        )),
        Entry("Portable Weather Controller", isAncient = false, properties = listOf(
            Color.Grey, Weight(30), EntryKind.Equipment
        )),
        Entry("Intergalactic Travel Logs", isAncient = false, properties = listOf(
            EntryKind.Data
        )),
        Entry("Small Hoverboard", isAncient = false, properties = listOf(
            Color.Red, Weight(0), EntryKind.Equipment
        )),
        Entry("Diesel Truck", isAncient = true, properties = listOf(
             Color.Blue, Weight(8000), EntryKind.Storage
        )),
        Entry("Wi-Fi Tablet", isAncient = true, properties = listOf(
            Color.White, Weight(1), EntryKind.Equipment
        )),
        Entry("Automated Vacuum Cleaner", isAncient = true, properties = listOf(
            Color.Green, Weight(5), EntryKind.Equipment
        )),
        Entry("Large Mithril Shield", isAncient = false, properties = listOf(
            Weight(3), EntryKind.Apparel
        )),
        Entry("HD Projector", isAncient = true, properties = listOf(
            Color.White, Weight(10), EntryKind.Equipment
        )),
        Entry("Fusion Reactor", isAncient = false, properties = listOf(
            Color.Grey, Weight(30000), EntryKind.Equipment
        )),
        Entry("Self-Aware AI", isAncient = false, properties = listOf(
            EntryKind.Data
        )),
        Entry("Self-Repairing Dinner Table", isAncient = false, properties = listOf(
            Color.White, Weight(10), EntryKind.Furniture
        )),
        Entry("Two-Handed Stone Axe", isAncient = false, properties = listOf(
            Color.Grey, Weight(50), EntryKind.Apparel
        ))
    )

    val entries = permute(baseEntries)

    private fun permute(list: List<Entry>): List<Entry>
    {
        val array = Array(list.size) { list[it] }

        for (i in array.indices)
        {
            val swapIndex = (Math.random() * (i + 1)).toInt()
            if (swapIndex < i)
            {
                val t = array[swapIndex]
                array[swapIndex] = array[i]
                array[i] = t
            }
        }
        return array.toList()
    }
}