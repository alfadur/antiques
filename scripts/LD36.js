var LD36 = function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    ControllerAction: Kotlin.createEnumClass(function () {
      return [Kotlin.Enum];
    }, function $fun() {
      $fun.baseInitializer.call(this);
    }, function () {
      return {
        Up: function () {
          return new _.ControllerAction();
        },
        Left: function () {
          return new _.ControllerAction();
        },
        Right: function () {
          return new _.ControllerAction();
        },
        Down: function () {
          return new _.ControllerAction();
        },
        Select: function () {
          return new _.ControllerAction();
        },
        Submit: function () {
          return new _.ControllerAction();
        }
      };
    }),
    Controller: Kotlin.createTrait(null),
    RandomController: Kotlin.createObject(function () {
      return [_.Controller];
    }, function () {
      this.ignoreActions_jte29o$ = Kotlin.kotlin.collections.listOf_za3rmp$(_.ControllerAction.Submit);
    }, /** @lends _.RandomController.prototype */ {
      isActive_k8o7am$: function (action) {
        return !this.ignoreActions_jte29o$.contains_za3rmp$(action) && Math.random() >= 0.5;
      }
    }),
    KeyboardController: Kotlin.createClass(function () {
      return [_.Controller];
    }, function (window) {
      this.holdActionKeys_y3qldg$ = Kotlin.kotlin.collections.mapOf_dvvt93$(Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Select, []));
      this.mixedActionKeys_9z5ava$ = Kotlin.kotlin.collections.mapOf_eoa9s7$([Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Up, []), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Left, []), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Down, []), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Right, [])]);
      this.pressActionKeys_l16neq$ = Kotlin.kotlin.collections.mapOf_eoa9s7$([Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Submit, [_.KeyCodes.Escape]), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Select, [_.KeyCodes.Space, _.KeyCodes.Enter]), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Up, [_.KeyCodes.Up, _.KeyCodes.W]), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Left, [_.KeyCodes.Left, _.KeyCodes.A]), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Down, [_.KeyCodes.Down, _.KeyCodes.S]), Kotlin.kotlin.to_l1ob02$(_.ControllerAction.Right, [_.KeyCodes.Right, _.KeyCodes.D])]);
      this.isDown_spu85l$ = Kotlin.kotlin.collections.hashSetOf_9mqe4v$([]);
      this.wasPressed_rsek04$ = Kotlin.kotlin.collections.hashSetOf_9mqe4v$([]);
      this.continuousMode_o0b3vn$ = true;
      var isDown = this.isDown_spu85l$;
      window.onkeydown = _.KeyboardController.KeyboardController$f(isDown, this);
      window.onkeyup = _.KeyboardController.KeyboardController$f_0(isDown);
    }, /** @lends _.KeyboardController.prototype */ {
      checkHold: function (keys) {
        var tmp$0;
        var tmp$1;
        if (keys != null) {
          any_74vioc$break: {
            var tmp$4, tmp$3, tmp$2;
            tmp$4 = keys, tmp$3 = tmp$4.length;
            for (var tmp$2 = 0; tmp$2 !== tmp$3; ++tmp$2) {
              var element = tmp$4[tmp$2];
              if (this.isDown_spu85l$.contains_za3rmp$(element)) {
                tmp$1 = true;
                break any_74vioc$break;
              }
            }
            tmp$1 = false;
          }
        }
         else
          tmp$1 = null;
        return (tmp$0 = tmp$1) != null ? tmp$0 : false;
      },
      retrieveFirst: function (keys) {
        var tmp$0, tmp$1, tmp$2;
        tmp$0 = keys != null ? keys : [], tmp$1 = tmp$0.length;
        for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
          var key = tmp$0[tmp$2];
          if (this.wasPressed_rsek04$.remove_za3rmp$(key)) {
            return true;
          }
        }
        return false;
      },
      isActive_k8o7am$: function (action) {
        return this.checkHold(this.holdActionKeys_y3qldg$.get_za3rmp$(action)) || this.retrieveFirst(this.pressActionKeys_l16neq$.get_za3rmp$(action)) || (this.continuousMode_o0b3vn$ ? this.checkHold(this.mixedActionKeys_9z5ava$.get_za3rmp$(action)) : this.retrieveFirst(this.mixedActionKeys_9z5ava$.get_za3rmp$(action)));
      }
    }, /** @lends _.KeyboardController */ {
      KeyboardController$f: function (closure$isDown, this$KeyboardController) {
        return function (it) {
          if (Kotlin.isType(it, KeyboardEvent)) {
            closure$isDown.add_za3rmp$(it.keyCode);
            this$KeyboardController.wasPressed_rsek04$.add_za3rmp$(it.keyCode);
            if (it.keyCode === _.KeyCodes.P) {
              this$KeyboardController.continuousMode_o0b3vn$ = !this$KeyboardController.continuousMode_o0b3vn$;
              this$KeyboardController.wasPressed_rsek04$.clear();
            }
          }
        };
      },
      KeyboardController$f_0: function (closure$isDown) {
        return function (it) {
          if (Kotlin.isType(it, KeyboardEvent)) {
            closure$isDown.remove_za3rmp$(it.keyCode);
          }
        };
      }
    }),
    EntryProperty: Kotlin.createTrait(null),
    Color: Kotlin.createEnumClass(function () {
      return [_.EntryProperty, Kotlin.Enum];
    }, function $fun() {
      $fun.baseInitializer.call(this);
    }, function () {
      return {
        Black: function () {
          return new _.Color();
        },
        Red: function () {
          return new _.Color();
        },
        Yellow: function () {
          return new _.Color();
        },
        Blue: function () {
          return new _.Color();
        },
        Green: function () {
          return new _.Color();
        },
        Grey: function () {
          return new _.Color();
        },
        White: function () {
          return new _.Color();
        }
      };
    }, /** @lends _.Color.prototype */ {
      propertyName: function () {
        return 'Color';
      }
    }),
    Weight: Kotlin.createClass(function () {
      return [_.EntryProperty];
    }, function (value) {
      this.value = value;
    }, /** @lends _.Weight.prototype */ {
      toString: function () {
        return this.value.toString() + ' kg';
      },
      propertyName: function () {
        return 'Weight';
      },
      component1: function () {
        return this.value;
      },
      copy_za3lpa$: function (value) {
        return new _.Weight(value === void 0 ? this.value : value);
      },
      hashCode: function () {
        var result = 0;
        result = result * 31 + Kotlin.hashCode(this.value) | 0;
        return result;
      },
      equals_za3rmp$: function (other) {
        return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.value, other.value))));
      }
    }),
    EntryKind: Kotlin.createEnumClass(function () {
      return [_.EntryProperty, Kotlin.Enum];
    }, function $fun() {
      $fun.baseInitializer.call(this);
    }, function () {
      return {
        Furniture: function () {
          return new _.EntryKind();
        },
        Storage: function () {
          return new _.EntryKind();
        },
        Data: function () {
          return new _.EntryKind();
        },
        Equipment: function () {
          return new _.EntryKind();
        },
        Apparel: function () {
          return new _.EntryKind();
        }
      };
    }, /** @lends _.EntryKind.prototype */ {
      propertyName: function () {
        return 'Usage';
      }
    }),
    Entry: Kotlin.createClass(null, function (name, isAncient, properties) {
      if (properties === void 0) {
        properties = Kotlin.kotlin.collections.emptyList();
      }
      this.name = name;
      this.isAncient = isAncient;
      this.properties = properties;
    }, /** @lends _.Entry.prototype */ {
      component1: function () {
        return this.name;
      },
      component2: function () {
        return this.isAncient;
      },
      component3: function () {
        return this.properties;
      },
      copy_tbl7u6$: function (name, isAncient, properties) {
        return new _.Entry(name === void 0 ? this.name : name, isAncient === void 0 ? this.isAncient : isAncient, properties === void 0 ? this.properties : properties);
      },
      toString: function () {
        return 'Entry(name=' + Kotlin.toString(this.name) + (', isAncient=' + Kotlin.toString(this.isAncient)) + (', properties=' + Kotlin.toString(this.properties)) + ')';
      },
      hashCode: function () {
        var result = 0;
        result = result * 31 + Kotlin.hashCode(this.name) | 0;
        result = result * 31 + Kotlin.hashCode(this.isAncient) | 0;
        result = result * 31 + Kotlin.hashCode(this.properties) | 0;
        return result;
      },
      equals_za3rmp$: function (other) {
        return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.isAncient, other.isAncient) && Kotlin.equals(this.properties, other.properties)))));
      }
    }),
    Data: Kotlin.createObject(null, function () {
      this.baseEntries = Kotlin.kotlin.collections.listOf_9mqe4v$([new _.Entry('SSD Drive', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Red, new _.Weight(1), _.EntryKind.Storage])), new _.Entry('HDMI Cable', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Black, new _.Weight(1), _.EntryKind.Equipment])), new _.Entry('LED TV', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Black, new _.Weight(10), _.EntryKind.Equipment])), new _.Entry('LED TV', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.White, new _.Weight(12), _.EntryKind.Equipment])), new _.Entry('Portable Black Hole', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Black, _.EntryKind.Storage])), new _.Entry('Nanofiber Sofa', false, Kotlin.kotlin.collections.listOf_9mqe4v$([new _.Weight(2), _.EntryKind.Furniture])), new _.Entry('Ancient Scythe of Corruption', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.EntryKind.Apparel, new _.Weight(27)])), new _.Entry('Elemental Scale Mail', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.EntryKind.Apparel, new _.Weight(15)])), new _.Entry('Medium FTL Engine', false, Kotlin.kotlin.collections.listOf_9mqe4v$([new _.Weight(1000), _.EntryKind.Equipment, _.Color.Yellow])), new _.Entry('Anti-Gravitation Boots', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Blue, new _.Weight(-153), _.EntryKind.Apparel])), new _.Entry('Blackboard', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Green, new _.Weight(30), _.EntryKind.Furniture])), new _.Entry('Steam Turbine', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Grey, new _.Weight(20000), _.EntryKind.Equipment])), new _.Entry('Electric Kettle', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Red, new _.Weight(3), _.EntryKind.Equipment])), new _.Entry('Wooden Cupboard', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Yellow, new _.Weight(40), _.EntryKind.Storage, _.EntryKind.Furniture])), new _.Entry('USB Flash Drive', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Green, new _.Weight(1), _.EntryKind.Storage])), new _.Entry('Portable Weather Controller', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Grey, new _.Weight(30), _.EntryKind.Equipment])), new _.Entry('Intergalactic Travel Logs', false, Kotlin.kotlin.collections.listOf_za3rmp$(_.EntryKind.Data)), new _.Entry('Small Hoverboard', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Red, new _.Weight(0), _.EntryKind.Equipment])), new _.Entry('Diesel Truck', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Blue, new _.Weight(8000), _.EntryKind.Storage])), new _.Entry('Wi-Fi Tablet', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.White, new _.Weight(1), _.EntryKind.Equipment])), new _.Entry('Automated Vacuum Cleaner', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Green, new _.Weight(5), _.EntryKind.Equipment])), new _.Entry('Large Mithril Shield', false, Kotlin.kotlin.collections.listOf_9mqe4v$([new _.Weight(3), _.EntryKind.Apparel])), new _.Entry('HD Projector', true, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.White, new _.Weight(10), _.EntryKind.Equipment])), new _.Entry('Fusion Reactor', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Grey, new _.Weight(30000), _.EntryKind.Equipment])), new _.Entry('Self-Aware AI', false, Kotlin.kotlin.collections.listOf_za3rmp$(_.EntryKind.Data)), new _.Entry('Self-Repairing Dinner Table', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.White, new _.Weight(10), _.EntryKind.Furniture])), new _.Entry('Two-Handed Stone Axe', false, Kotlin.kotlin.collections.listOf_9mqe4v$([_.Color.Grey, new _.Weight(50), _.EntryKind.Apparel]))]);
      this.entries = this.permute(this.baseEntries);
    }, /** @lends _.Data.prototype */ {
      permute: function (list) {
        var tmp$0, tmp$1, tmp$2, tmp$3;
        var array = Kotlin.arrayFromFun(list.size, _.Data.permute$f(list));
        tmp$0 = Kotlin.kotlin.collections.get_indices_eg9ybj$(array), tmp$1 = tmp$0.first, tmp$2 = tmp$0.last, tmp$3 = tmp$0.step;
        for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
          var swapIndex = Math.random() * (i + 1) | 0;
          if (swapIndex < i) {
            var t = array[swapIndex];
            array[swapIndex] = array[i];
            array[i] = t;
          }
        }
        return Kotlin.kotlin.collections.toList_eg9ybj$(array);
      }
    }, /** @lends _.Data */ {
      permute$f: function (closure$list) {
        return function (it) {
          return closure$list.get_za3lpa$(it);
        };
      }
    }),
    Dialog: Kotlin.createClass(null, function (externalContainer, width, height, texture) {
      var tmp$0, tmp$1, tmp$2, tmp$3;
      this.externalContainer = externalContainer;
      this.width = width;
      this.height = height;
      this.texture = texture;
      this.side = 20;
      this.tileSize = 20;
      this.textures = _.slice_7w3woh$(this.texture, [this.side, this.tileSize, this.side]);
      this.background_gtlxf8$ = new PIXI.SpriteBatch();
      this.container_1bwsjf$ = new PIXI.DisplayObjectContainer();
      this.clientContainer_t4ofbk$ = new PIXI.DisplayObjectContainer();
      var xTiles = (this.width - this.side * 2) / this.tileSize | 0;
      var yTiles = (this.height - this.side * 2) / this.tileSize | 0;
      this.actualWidth = xTiles * this.tileSize + this.side * 2;
      this.actualHeight = yTiles * this.tileSize + this.side * 2;
      this.clientWidth = this.actualWidth - this.side * 2;
      this.clientHeight = this.actualHeight - this.side * 2;
      var offsetX = (this.width - this.actualWidth) / 2 | 0;
      var offsetY = (this.height - this.actualHeight) / 2 | 0;
      this.addSprite(0, 0, this.textures[0]);
      this.addSprite(this.actualWidth - this.side, 0, this.textures[2]);
      this.addSprite(0, this.actualHeight - this.side, this.textures[6]);
      this.addSprite(this.actualWidth - this.side, this.actualHeight - this.side, this.textures[8]);
      tmp$0 = xTiles - 1;
      for (var x = 0; x <= tmp$0; x++) {
        this.addSprite(this.side + x * this.tileSize, 0, this.textures[1]);
        this.addSprite(this.side + x * this.tileSize, this.actualHeight - this.side, this.textures[7]);
      }
      tmp$1 = yTiles - 1;
      for (var y = 0; y <= tmp$1; y++) {
        this.addSprite(0, this.side + y * this.tileSize, this.textures[3]);
        this.addSprite(this.actualWidth - this.side, this.side + y * this.tileSize, this.textures[5]);
      }
      tmp$2 = xTiles - 1;
      for (var x_0 = 0; x_0 <= tmp$2; x_0++) {
        tmp$3 = yTiles - 1;
        for (var y_0 = 0; y_0 <= tmp$3; y_0++) {
          this.addSprite(this.side + x_0 * this.tileSize, this.side + y_0 * this.tileSize, this.textures[4]);
        }
      }
      this.background_gtlxf8$.position = new PIXI.Point(offsetX, offsetY);
      this.container_1bwsjf$.addChild(this.background_gtlxf8$);
      this.clientContainer_t4ofbk$.position = new PIXI.Point(this.side + offsetX, this.side + offsetY);
      this.container_1bwsjf$.addChild(this.clientContainer_t4ofbk$);
      this.externalContainer.addChild(this.container_1bwsjf$);
      this.container_1bwsjf$.position;
    }, /** @lends _.Dialog.prototype */ {
      position: {
        get: function () {
          return this.container_1bwsjf$.position;
        },
        set: function (v) {
          this.container_1bwsjf$.position = v;
        }
      },
      add_68gber$: function (d) {
        this.clientContainer_t4ofbk$.addChild(d);
        return d;
      },
      remove_68gber$: function (it) {
        this.clientContainer_t4ofbk$.removeChild(it);
      },
      close: function () {
        this.externalContainer.removeChild(this.container_1bwsjf$);
      },
      addSprite: function (x, y, texture) {
        var sprite = new PIXI.Sprite(texture);
        sprite.position = new PIXI.Point(x, y);
        this.background_gtlxf8$.addChild(sprite);
      }
    }),
    Dialog_init_x0ohj5$: function (externalContainer, size, texture, $this) {
      $this = $this || Object.create(_.Dialog.prototype);
      _.Dialog.call($this, externalContainer, Kotlin.numberToInt(size.width), Kotlin.numberToInt(size.height), texture);
      $this.position = new PIXI.Point(size.x, size.y);
      return $this;
    },
    GameStage: Kotlin.createTrait(null, /** @lends _.GameStage.prototype */ {
      section_ss1lv0$: function (x, y) {
        return new PIXI.Rectangle(x.start * this.gameSize.x, y.start * this.gameSize.y, _.get_length_p6y9k$(x) * this.gameSize.x, _.get_length_p6y9k$(y) * this.gameSize.y);
      }
    }),
    IngameStage: Kotlin.createClass(function () {
      return [_.GameStage];
    }, function (gameSize, window, icons) {
      this.$gameSize_lsacnu$ = gameSize;
      this.container = new PIXI.DisplayObjectContainer();
      this.result = null;
      var split = 0.625;
      var d1 = _.Dialog_init_x0ohj5$(this.container, this.section_ss1lv0$(Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.0, split), Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.0, 0.85)), window);
      var d2 = _.Dialog_init_x0ohj5$(this.container, this.section_ss1lv0$(Kotlin.kotlin.ranges.rangeTo_n1zt5e$(split, 1.0), Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.0, 0.85)), window);
      var d3 = _.Dialog_init_x0ohj5$(this.container, this.section_ss1lv0$(Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.0, 1.0), Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.825, 1.0)), window);
      var $receiver = _.Data.entries;
      var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver, 10));
      var tmp$4;
      tmp$4 = $receiver.iterator();
      while (tmp$4.hasNext()) {
        var item = tmp$4.next();
        destination.add_za3rmp$(item.name);
      }
      this.list = new _.ListView(d1, destination, icons.get_za3lpa$(1), icons.get_za3lpa$(2), icons.get_za3lpa$(0));
      this.property = new _.PropertyView(d2);
      this.property.entry = _.Data.entries.get_za3lpa$(0);
      var messageStyle = new _.TextStyle('blanchedalmond', false, void 0, _.TextView.Companion.font);
      this.weightText = new PIXI.Text('Total Weight: 0 kg', messageStyle);
      d3.add_68gber$(this.weightText);
      var $receiver_0 = new PIXI.Text('<ESC> to confirm selection', messageStyle);
      $receiver_0.position = new PIXI.Point(d3.clientWidth - Kotlin.numberToDouble($receiver_0.width), 0);
      d3.add_68gber$($receiver_0);
    }, /** @lends _.IngameStage.prototype */ {
      gameSize: {
        get: function () {
          return this.$gameSize_lsacnu$;
        }
      },
      handleController_riqvk4$: function (controller) {
        var tmp$0;
        if (controller.isActive_k8o7am$(_.ControllerAction.Up))
          this.list.moveCursor_za3lpa$(-1);
        else if (controller.isActive_k8o7am$(_.ControllerAction.Down))
          this.list.moveCursor_za3lpa$(1);
        else if (controller.isActive_k8o7am$(_.ControllerAction.Left))
          this.list.moveCursor_za3lpa$(-this.list.displayCount);
        else if (controller.isActive_k8o7am$(_.ControllerAction.Right))
          this.list.moveCursor_za3lpa$(this.list.displayCount);
        else if (controller.isActive_k8o7am$(_.ControllerAction.Select)) {
          this.list.toggleSelection();
          var $receiver = this.list.selectedIndices;
          var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver, 10));
          var tmp$1;
          tmp$1 = $receiver.iterator();
          while (tmp$1.hasNext()) {
            var item = tmp$1.next();
            destination.add_za3rmp$(_.Data.entries.get_za3lpa$(item));
          }
          var items = destination;
          var all_udlcbx$result;
          all_udlcbx$break: {
            var tmp$4;
            tmp$4 = items.iterator();
            while (tmp$4.hasNext()) {
              var element = tmp$4.next();
              var predicate$result;
              predicate$break: {
                var tmp$5;
                tmp$5 = element.properties.iterator();
                while (tmp$5.hasNext()) {
                  var element_0 = tmp$5.next();
                  if (Kotlin.isType(element_0, _.Weight)) {
                    predicate$result = true;
                    break predicate$break;
                  }
                }
                predicate$result = false;
              }
              if (!predicate$result) {
                all_udlcbx$result = false;
                break all_udlcbx$break;
              }
            }
            all_udlcbx$result = true;
          }
          if (all_udlcbx$result) {
            var tmp$6;
            var sum = 0;
            tmp$6 = items.iterator();
            while (tmp$6.hasNext()) {
              var element_1 = tmp$6.next();
              var tmp$8;
              var $receiver_2 = element_1.properties;
              var first_udlcbx$result;
              first_udlcbx$break: {
                var tmp$7;
                tmp$7 = $receiver_2.iterator();
                while (tmp$7.hasNext()) {
                  var element_2 = tmp$7.next();
                  if (Kotlin.isType(element_2, _.Weight)) {
                    first_udlcbx$result = element_2;
                    break first_udlcbx$break;
                  }
                }
                throw new Kotlin.NoSuchElementException('Collection contains no element matching the predicate.');
              }
              sum += (Kotlin.isType(tmp$8 = first_udlcbx$result, _.Weight) ? tmp$8 : Kotlin.throwCCE()).value;
            }
            var weight = sum;
            this.weightText.text = 'Total Weight: ' + weight + ' kg';
          }
           else {
            this.weightText.text = 'Total Weight: Unknown';
          }
          this.weightText.setStyle((tmp$0 = this.weightText.style) != null ? tmp$0 : Kotlin.throwNPE());
        }
         else if (controller.isActive_k8o7am$(_.ControllerAction.Submit)) {
          var $receiver_3 = this.list.selectedIndices;
          var destination_0 = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver_3, 10));
          var tmp$10;
          tmp$10 = $receiver_3.iterator();
          while (tmp$10.hasNext()) {
            var item_0 = tmp$10.next();
            destination_0.add_za3rmp$(_.Data.entries.get_za3lpa$(item_0));
          }
          this.result = destination_0;
        }
      },
      update: function () {
        this.property.entry = _.Data.entries.get_za3lpa$(this.list.cursorPosition);
      },
      root: {
        get: function () {
          return this.container;
        }
      }
    }, /** @lends _.IngameStage */ {
    }),
    MenuStage: Kotlin.createClass(function () {
      return [_.GameStage];
    }, function (gameSize, message, choices, window, icons) {
      this.$gameSize_mya4ri$ = gameSize;
      this.container = new PIXI.DisplayObjectContainer();
      this.selection = null;
      var d = _.Dialog_init_x0ohj5$(this.container, this.section_ss1lv0$(Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.0, 1.0), Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.0, 0.8)), window);
      var messageStyle = new _.TextStyle('blanchedalmond', true, d.clientWidth, _.TextView.Companion.font);
      var $receiver = new PIXI.Text(message, messageStyle);
      $receiver.position = new PIXI.Point(0, 0);
      d.add_68gber$($receiver);
      var menu = _.Dialog_init_x0ohj5$(this.container, this.section_ss1lv0$(Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.3, 0.7), Kotlin.kotlin.ranges.rangeTo_n1zt5e$(0.65, 0.95)), window);
      this.list = new _.ListView(menu, choices, icons.get_za3lpa$(1), icons.get_za3lpa$(2), icons.get_za3lpa$(0));
      this.$root_7iwjht$ = this.container;
    }, /** @lends _.MenuStage.prototype */ {
      gameSize: {
        get: function () {
          return this.$gameSize_mya4ri$;
        }
      },
      handleController_riqvk4$: function (controller) {
        if (controller.isActive_k8o7am$(_.ControllerAction.Up) || controller.isActive_k8o7am$(_.ControllerAction.Left))
          this.list.moveCursor_za3lpa$(-1);
        else if (controller.isActive_k8o7am$(_.ControllerAction.Down) || controller.isActive_k8o7am$(_.ControllerAction.Right))
          this.list.moveCursor_za3lpa$(this.list.displayCount);
        else if (controller.isActive_k8o7am$(_.ControllerAction.Select))
          this.selection = this.list.cursorPosition;
      },
      update: function () {
      },
      root: {
        get: function () {
          return this.$root_7iwjht$;
        }
      }
    }, /** @lends _.MenuStage */ {
    }),
    Point: Kotlin.createClass(null, function (x, y) {
      if (x === void 0)
        x = 0;
      if (y === void 0)
        y = 0;
      this.x = x;
      this.y = y;
    }, /** @lends _.Point.prototype */ {
      plus_h80bq7$: function (d) {
        return new _.Point(this.x + d.shift.x, this.y + d.shift.y);
      },
      minus_h80bq7$: function (d) {
        return new _.Point(this.x + d.shift.x, this.y + d.shift.y);
      },
      component1: function () {
        return this.x;
      },
      component2: function () {
        return this.y;
      },
      copy_vux9f0$: function (x, y) {
        return new _.Point(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
      },
      toString: function () {
        return 'Point(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
      },
      hashCode: function () {
        var result = 0;
        result = result * 31 + Kotlin.hashCode(this.x) | 0;
        result = result * 31 + Kotlin.hashCode(this.y) | 0;
        return result;
      },
      equals_za3rmp$: function (other) {
        return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
      }
    }, /** @lends _.Point */ {
      Companion: Kotlin.createObject(null, function () {
        _.Point.Companion.zero = new _.Point();
      }),
      object_initializer$: function () {
        _.Point.Companion;
      }
    }),
    Direction: Kotlin.createEnumClass(function () {
      return [Kotlin.Enum];
    }, function $fun(shift) {
      $fun.baseInitializer.call(this);
      this.shift = shift;
    }, function () {
      return {
        None: function () {
          return new _.Direction(_.Point.Companion.zero);
        },
        Up: function () {
          return new _.Direction(new _.Point(0, 1));
        },
        Left: function () {
          return new _.Direction(new _.Point(-1, 0));
        },
        Down: function () {
          return new _.Direction(new _.Point(0, -1));
        },
        Right: function () {
          return new _.Direction(new _.Point(1, 0));
        }
      };
    }),
    Vector: Kotlin.createClass(null, function (x, y) {
      if (x === void 0)
        x = 0.0;
      if (y === void 0)
        y = 0.0;
      this.x = x;
      this.y = y;
    }, /** @lends _.Vector.prototype */ {
      component1: function () {
        return this.x;
      },
      component2: function () {
        return this.y;
      },
      copy_lu1900$: function (x, y) {
        return new _.Vector(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
      },
      toString: function () {
        return 'Vector(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
      },
      hashCode: function () {
        var result = 0;
        result = result * 31 + Kotlin.hashCode(this.x) | 0;
        result = result * 31 + Kotlin.hashCode(this.y) | 0;
        return result;
      },
      equals_za3rmp$: function (other) {
        return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
      }
    }, /** @lends _.Vector */ {
      Companion: Kotlin.createObject(null, function () {
        _.Vector.Companion.zero = new _.Vector();
      }),
      object_initializer$: function () {
        _.Vector.Companion;
      }
    }),
    clamp_n6qkdc$: function ($receiver, min, max) {
      if ($receiver < min)
        return min;
      else if ($receiver > max)
        return max;
      else
        return $receiver;
    },
    Messages: Kotlin.createObject(null, function () {
      this.introMessage = 'Welcome to your new position! Our company has been the market leader in historical reconstructions ' + 'since 2194. Your job today is to make a selection from a catalog of antique items ' + 'for us to scan and use in reconstruction of various scenes set in 2016. For this purpose, ' + "we've prepared a UI " + 'resembling those that our history consultant claims were used during the target time period.\n\n' + 'Use <Arrows> or <WASD> to navigate menus and <Enter> for selection.';
      this.taskMessages = Kotlin.kotlin.collections.listOf_9mqe4v$(['Please select 4 antique items from around 2016, ensuring that they all have different color.', 'Please select 6 antique items from around 2016, ensuring that their ' + 'total weight is no more than 15 kg.']);
    }),
    GameFlowState: Kotlin.createEnumClass(function () {
      return [Kotlin.Enum];
    }, function $fun() {
      $fun.baseInitializer.call(this);
    }, function () {
      return {
        TaskSelection: function () {
          return new _.GameFlowState();
        },
        TaskConfirmation: function () {
          return new _.GameFlowState();
        },
        TaskCompletion: function () {
          return new _.GameFlowState();
        },
        FeedbackConfirmation: function () {
          return new _.GameFlowState();
        }
      };
    }),
    Game: Kotlin.createClass(null, function () {
      var tmp$0;
      this.screenWidth = 520;
      this.screenHeight = 420;
      this.renderer = new PIXI.CanvasRenderer(this.screenWidth, this.screenHeight);
      this.stage = new PIXI.Stage(136);
      this.controller = new _.KeyboardController(window);
      this.flow = _.GameFlowState.TaskSelection;
      this.taskIndex = 0;
      this.background = PIXI.BaseTexture.fromImage('images/background.png', false);
      var $this = PIXI.BaseTexture.fromImage('images/tiles.png', false);
      var tmp$2;
      var tileSize = 40;
      var list = Kotlin.kotlin.collections.arrayListOf_9mqe4v$([]);
      tmp$2 = 2;
      for (var i = 0; i <= tmp$2; i++) {
        var x = i % 2 * tileSize;
        var y = (i / 2 | 0) * tileSize;
        var texture = new PIXI.Texture($this, new PIXI.Rectangle(x, y, tileSize, tileSize));
        list.add_za3rmp$(texture);
      }
      this.iconsTextures = list;
      this.windowTexture = PIXI.BaseTexture.fromImage('images/window.png', false);
      this.gameSize = new _.Point(this.screenWidth, this.screenHeight);
      (tmp$0 = document.getElementById('game')) != null ? tmp$0.appendChild(this.renderer.view) : null;
      window.requestAnimationFrame(_.Game.Game$f(this));
      var b = new PIXI.Sprite(new PIXI.Texture(this.background, new PIXI.Rectangle(0, 0, this.screenWidth, this.screenHeight)));
      this.stage.addChild(b);
      this.gameStage = this.createMenuStage();
      this.stage.addChild(this.gameStage.root);
    }, /** @lends _.Game.prototype */ {
      checkResult_i715p2$: function (result, taskIndex) {
        var key;
        var tmp$0;
        if (taskIndex === 0)
          if (result.size < 4)
            tmp$0 = 'Less than 4 items were selected.';
          else {
            var any_udlcbx$result;
            any_udlcbx$break: {
              var tmp$1;
              tmp$1 = result.iterator();
              while (tmp$1.hasNext()) {
                var element = tmp$1.next();
                if (!element.isAncient) {
                  any_udlcbx$result = true;
                  break any_udlcbx$break;
                }
              }
              any_udlcbx$result = false;
            }
            if (any_udlcbx$result)
              tmp$0 = 'Some items do not seem to be from the target time period.';
            else {
              var any_udlcbx$result_0;
              any_udlcbx$break_0: {
                var tmp$2;
                tmp$2 = result.iterator();
                while (tmp$2.hasNext()) {
                  var element_0 = tmp$2.next();
                  var predicate_0$result;
                  predicate_0$break: {
                    var tmp$3;
                    tmp$3 = element_0.properties.iterator();
                    while (tmp$3.hasNext()) {
                      var element_1 = tmp$3.next();
                      if (!!Kotlin.isType(element_1, _.Color)) {
                        predicate_0$result = false;
                        break predicate_0$break;
                      }
                    }
                    predicate_0$result = true;
                  }
                  if (predicate_0$result) {
                    any_udlcbx$result_0 = true;
                    break any_udlcbx$break_0;
                  }
                }
                any_udlcbx$result_0 = false;
              }
              if (any_udlcbx$result_0)
                tmp$0 = 'Some items do not have a defined color.';
              else {
                var tmp$4;
                var set = new Kotlin.ComplexHashSet();
                var list = new Kotlin.ArrayList();
                tmp$4 = result.iterator();
                while (tmp$4.hasNext()) {
                  var e = tmp$4.next();
                  selector$break: {
                    var tmp$5;
                    tmp$5 = e.properties.iterator();
                    while (tmp$5.hasNext()) {
                      var element_2 = tmp$5.next();
                      if (Kotlin.isType(element_2, _.Color)) {
                        key = element_2;
                        break selector$break;
                      }
                    }
                    key = null;
                  }
                  if (set.add_za3rmp$(key)) {
                    list.add_za3rmp$(e);
                  }
                }
                if (list.size < result.size)
                  tmp$0 = 'Some items have the same color.';
                else
                  tmp$0 = null;
              }
            }
          }
         else if (taskIndex === 1)
          if (result.size < 6)
            tmp$0 = 'Less than 6 items were selected.';
          else {
            var any_udlcbx$result_1;
            any_udlcbx$break_1: {
              var tmp$6;
              tmp$6 = result.iterator();
              while (tmp$6.hasNext()) {
                var element_3 = tmp$6.next();
                if (!element_3.isAncient) {
                  any_udlcbx$result_1 = true;
                  break any_udlcbx$break_1;
                }
              }
              any_udlcbx$result_1 = false;
            }
            if (any_udlcbx$result_1)
              tmp$0 = 'Some items do not seem to be from the target time period.';
            else {
              var any_udlcbx$result_2;
              any_udlcbx$break_2: {
                var tmp$7;
                tmp$7 = result.iterator();
                while (tmp$7.hasNext()) {
                  var element_4 = tmp$7.next();
                  var predicate_2$result;
                  predicate_2$break: {
                    var tmp$8;
                    tmp$8 = element_4.properties.iterator();
                    while (tmp$8.hasNext()) {
                      var element_5 = tmp$8.next();
                      if (!!Kotlin.isType(element_5, _.Weight)) {
                        predicate_2$result = false;
                        break predicate_2$break;
                      }
                    }
                    predicate_2$result = true;
                  }
                  if (predicate_2$result) {
                    any_udlcbx$result_2 = true;
                    break any_udlcbx$break_2;
                  }
                }
                any_udlcbx$result_2 = false;
              }
              if (any_udlcbx$result_2)
                tmp$0 = 'Some items do not have a defined weight.';
              else {
                var tmp$9;
                var sum = 0;
                tmp$9 = result.iterator();
                while (tmp$9.hasNext()) {
                  var element_6 = tmp$9.next();
                  var tmp$11;
                  var $receiver_5 = element_6.properties;
                  var first_udlcbx$result;
                  first_udlcbx$break: {
                    var tmp$10;
                    tmp$10 = $receiver_5.iterator();
                    while (tmp$10.hasNext()) {
                      var element_7 = tmp$10.next();
                      if (Kotlin.isType(element_7, _.Weight)) {
                        first_udlcbx$result = element_7;
                        break first_udlcbx$break;
                      }
                    }
                    throw new Kotlin.NoSuchElementException('Collection contains no element matching the predicate.');
                  }
                  sum += (Kotlin.isType(tmp$11 = first_udlcbx$result, _.Weight) ? tmp$11 : Kotlin.throwCCE()).value;
                }
                if (sum > 15)
                  tmp$0 = "Total items' weight is more than 15 kg.";
                else
                  tmp$0 = null;
              }
            }
          }
         else
          tmp$0 = null;
        var error = tmp$0;
        return error != null ? 'There was an issue with your selection:' + '\n' + '\n' + Kotlin.toString(error) : "You've successfully completed the task.\nThank you for your time.";
      },
      createMenuStage: function () {
        return new _.MenuStage(this.gameSize, _.Messages.introMessage, Kotlin.kotlin.collections.listOf_9mqe4v$(['Task 1', 'Task 2']), this.windowTexture, this.iconsTextures);
      },
      createTaskStage_za3lpa$: function (taskIndex) {
        return new _.MenuStage(this.gameSize, _.Messages.taskMessages.get_za3lpa$(taskIndex), Kotlin.kotlin.collections.listOf_9mqe4v$(['Begin Task', 'Back to Menu']), this.windowTexture, this.iconsTextures);
      },
      createFeedbackStage_61zpoe$: function (message) {
        return new _.MenuStage(this.gameSize, message, Kotlin.kotlin.collections.listOf_za3rmp$('Back to Menu'), this.windowTexture, this.iconsTextures);
      },
      switchStage_lijjzo$: function (newStage) {
        this.stage.removeChild(this.gameStage.root);
        this.stage.addChild(newStage.root);
        this.gameStage = newStage;
      },
      update: function () {
        var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6, tmp$7, tmp$8;
        this.gameStage.handleController_riqvk4$(this.controller);
        this.gameStage.update();
        tmp$0 = this.flow;
        if (Kotlin.equals(tmp$0, _.GameFlowState.TaskSelection)) {
          var selection = (tmp$2 = Kotlin.isType(tmp$1 = this.gameStage, _.MenuStage) ? tmp$1 : null) != null ? tmp$2.selection : null;
          if (selection != null) {
            this.switchStage_lijjzo$(this.createTaskStage_za3lpa$(selection));
            this.flow = _.GameFlowState.TaskConfirmation;
            this.taskIndex = selection;
          }
        }
         else if (Kotlin.equals(tmp$0, _.GameFlowState.TaskConfirmation)) {
          var selection_0 = (tmp$4 = Kotlin.isType(tmp$3 = this.gameStage, _.MenuStage) ? tmp$3 : null) != null ? tmp$4.selection : null;
          if (selection_0 === 0) {
            this.switchStage_lijjzo$(new _.IngameStage(this.gameSize, this.windowTexture, this.iconsTextures));
            this.flow = _.GameFlowState.TaskCompletion;
          }
           else if (selection_0 === 1) {
            this.switchStage_lijjzo$(this.createMenuStage());
            this.flow = _.GameFlowState.TaskSelection;
          }
        }
         else if (Kotlin.equals(tmp$0, _.GameFlowState.TaskCompletion)) {
          var result = (tmp$6 = Kotlin.isType(tmp$5 = this.gameStage, _.IngameStage) ? tmp$5 : null) != null ? tmp$6.result : null;
          if (result != null) {
            this.switchStage_lijjzo$(this.createFeedbackStage_61zpoe$(this.checkResult_i715p2$(result, this.taskIndex)));
            this.flow = _.GameFlowState.FeedbackConfirmation;
          }
        }
         else if (Kotlin.equals(tmp$0, _.GameFlowState.FeedbackConfirmation)) {
          var selection_1 = (tmp$8 = Kotlin.isType(tmp$7 = this.gameStage, _.MenuStage) ? tmp$7 : null) != null ? tmp$8.selection : null;
          if (selection_1 != null) {
            this.switchStage_lijjzo$(this.createMenuStage());
            this.flow = _.GameFlowState.TaskSelection;
          }
        }
        this.renderer.render(this.stage);
        window.requestAnimationFrame(_.Game.update$f(this));
      }
    }, /** @lends _.Game */ {
      update$f: function (this$Game) {
        return function (it) {
          this$Game.update();
        };
      },
      Game$f: function (this$Game) {
        return function (it) {
          this$Game.update();
        };
      }
    }),
    main_kand9s$f: function (it) {
      return new _.Game();
    },
    main_kand9s$: function (args) {
      window.onload = _.main_kand9s$f;
    },
    TextStyle: Kotlin.createClass(null, function (fill, wordWrap, wordWrapWidth, font) {
      if (fill === void 0)
        fill = 'black';
      if (wordWrap === void 0)
        wordWrap = false;
      if (wordWrapWidth === void 0)
        wordWrapWidth = 100;
      if (font === void 0)
        font = null;
      this.fill = fill;
      this.wordWrap = wordWrap;
      this.wordWrapWidth = wordWrapWidth;
      this.font = font;
    }, /** @lends _.TextStyle.prototype */ {
      component1: function () {
        return this.fill;
      },
      component2: function () {
        return this.wordWrap;
      },
      component3: function () {
        return this.wordWrapWidth;
      },
      component4: function () {
        return this.font;
      },
      copy_tjmti3$: function (fill, wordWrap, wordWrapWidth, font) {
        return new _.TextStyle(fill === void 0 ? this.fill : fill, wordWrap === void 0 ? this.wordWrap : wordWrap, wordWrapWidth === void 0 ? this.wordWrapWidth : wordWrapWidth, font === void 0 ? this.font : font);
      },
      toString: function () {
        return 'TextStyle(fill=' + Kotlin.toString(this.fill) + (', wordWrap=' + Kotlin.toString(this.wordWrap)) + (', wordWrapWidth=' + Kotlin.toString(this.wordWrapWidth)) + (', font=' + Kotlin.toString(this.font)) + ')';
      },
      hashCode: function () {
        var result = 0;
        result = result * 31 + Kotlin.hashCode(this.fill) | 0;
        result = result * 31 + Kotlin.hashCode(this.wordWrap) | 0;
        result = result * 31 + Kotlin.hashCode(this.wordWrapWidth) | 0;
        result = result * 31 + Kotlin.hashCode(this.font) | 0;
        return result;
      },
      equals_za3rmp$: function (other) {
        return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.fill, other.fill) && Kotlin.equals(this.wordWrap, other.wordWrap) && Kotlin.equals(this.wordWrapWidth, other.wordWrapWidth) && Kotlin.equals(this.font, other.font)))));
      }
    }),
    slice_7w3woh$: function ($receiver, sizes) {
      var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5;
      var result = Kotlin.kotlin.collections.arrayListOf_9mqe4v$([]);
      var x = 0;
      var y = 0;
      tmp$0 = sizes, tmp$1 = tmp$0.length;
      for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
        var height = tmp$0[tmp$2];
        tmp$3 = sizes, tmp$4 = tmp$3.length;
        for (var tmp$5 = 0; tmp$5 !== tmp$4; ++tmp$5) {
          var width = tmp$3[tmp$5];
          result.add_za3rmp$(new PIXI.Texture($receiver, new PIXI.Rectangle(x, y, width, height)));
          x += width;
        }
        y += height;
        x = 0;
      }
      return Kotlin.copyToArray(result);
    },
    plus_f0z2s2$: function ($receiver, p) {
      return new PIXI.Point(Kotlin.numberToDouble($receiver.x) + Kotlin.numberToDouble(p.x), Kotlin.numberToDouble($receiver.y) + Kotlin.numberToDouble(p.y));
    },
    TextView: Kotlin.createClass(null, null, null, /** @lends _.TextView */ {
      Companion: Kotlin.createObject(null, function () {
        _.TextView.Companion.fontSize = 14;
        _.TextView.Companion.font = '14pt Cursive';
      }),
      object_initializer$: function () {
        _.TextView.Companion;
      }
    }),
    ListView: Kotlin.createClass(function () {
      return [_.TextView];
    }, function $fun(dialog, items, cursorTexture, scrollerTexture, selectorTexture) {
      $fun.baseInitializer.call(this);
      this.dialog = dialog;
      this.items = items;
      this.cursorTexture = cursorTexture;
      this.scrollerTexture = scrollerTexture;
      this.selectorTexture = selectorTexture;
      this.scrollPosition = 0;
      this.cursorPosition = 0;
      this.lineHeight = _.TextView.Companion.fontSize * 1.5;
      this.displayCount = this.dialog.clientHeight / (this.lineHeight | 0) | 0;
      this.selection_4kwsv3$ = Kotlin.kotlin.collections.arrayListOf_9mqe4v$([]);
      this.cursorStyle_s5i29c$ = new _.TextStyle(_.ListView.Companion.cursorColor, false, void 0, _.TextView.Companion.font);
      this.selectedStyle_azbd0r$ = new _.TextStyle(_.ListView.Companion.selectedColor, false, void 0, _.TextView.Companion.font);
      this.unselectedStyle_t5roge$ = new _.TextStyle(_.ListView.Companion.unselectedColor, false, void 0, _.TextView.Companion.font);
      var $receiver = new Kotlin.NumberRange(0, this.displayCount - 1);
      var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver, 10));
      var tmp$2;
      tmp$2 = $receiver.iterator();
      while (tmp$2.hasNext()) {
        var item = tmp$2.next();
        var tmp$4 = destination.add_za3rmp$.bind(destination);
        var $receiver_0 = new PIXI.Text('', this.unselectedStyle_t5roge$);
        $receiver_0.position = new PIXI.Point(0, item * this.lineHeight);
        tmp$4($receiver_0);
      }
      this.lines_tcbbcc$ = destination;
      this.selectorBatch_m20228$ = new PIXI.SpriteBatch();
      var $receiver_1 = Kotlin.kotlin.collections.get_indices_mwto7b$(this.lines_tcbbcc$);
      var destination_0 = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver_1, 10));
      var tmp$5;
      tmp$5 = $receiver_1.iterator();
      while (tmp$5.hasNext()) {
        var item_0 = tmp$5.next();
        var tmp$7 = destination_0.add_za3rmp$.bind(destination_0);
        var $receiver_2 = new PIXI.Sprite(this.selectorTexture);
        $receiver_2.position = new PIXI.Point(0, item_0 * this.lineHeight);
        $receiver_2.width = _.TextView.Companion.fontSize;
        $receiver_2.height = _.TextView.Companion.fontSize;
        $receiver_2.visible = false;
        tmp$7($receiver_2);
      }
      this.selectors_4kwoc7$ = destination_0;
      var tmp$8;
      tmp$8 = this.selectors_4kwoc7$.iterator();
      while (tmp$8.hasNext()) {
        var element = tmp$8.next();
        this.selectorBatch_m20228$.addChild(element);
      }
      this.dialog.add_68gber$(this.selectorBatch_m20228$);
      var tmp$9;
      tmp$9 = this.lines_tcbbcc$.iterator();
      while (tmp$9.hasNext()) {
        var element_0 = tmp$9.next();
        this.dialog.add_68gber$(element_0);
      }
      this.cursor_9pzpy9$ = new PIXI.Sprite(this.cursorTexture);
      var $this = this.cursor_9pzpy9$;
      $this.width = _.TextView.Companion.fontSize;
      $this.height = _.TextView.Companion.fontSize;
      this.dialog.add_68gber$(this.cursor_9pzpy9$);
      this.scroller_lm1q9x$ = new PIXI.Sprite(this.scrollerTexture);
      if (this.items.size > this.displayCount) {
        this.dialog.add_68gber$(this.scroller_lm1q9x$);
      }
      this.update();
    }, /** @lends _.ListView.prototype */ {
      selectedIndices: {
        get: function () {
          return Kotlin.kotlin.collections.toList_q5oq31$(this.selection_4kwsv3$);
        }
      },
      update: function () {
        var tmp$1, tmp$3, tmp$4;
        tmp$1 = Kotlin.kotlin.collections.withIndex_q5oq31$(this.selectors_4kwoc7$).iterator();
        while (tmp$1.hasNext()) {
          var tmp$0 = tmp$1.next()
          , i = tmp$0.component1()
          , selector = tmp$0.component2();
          selector.visible = this.selection_4kwsv3$.contains_za3rmp$(i + this.scrollPosition);
        }
        var items = Kotlin.kotlin.collections.take_cwv5p1$(Kotlin.kotlin.collections.drop_cwv5p1$(this.items, this.scrollPosition), this.displayCount);
        tmp$3 = Kotlin.kotlin.collections.withIndex_q5oq31$(this.lines_tcbbcc$).iterator();
        while (tmp$3.hasNext()) {
          var tmp$2 = tmp$3.next()
          , i_0 = tmp$2.component1()
          , line = tmp$2.component2();
          var index = i_0 + this.scrollPosition;
          var isUnderCursor = this.cursorPosition === index;
          var isSelected = isUnderCursor || this.selection_4kwsv3$.contains_za3rmp$(index);
          var offset = isSelected ? _.TextView.Companion.fontSize * 1.2 : 0.0;
          if (isUnderCursor)
            tmp$4 = this.cursorStyle_s5i29c$;
          else if (isSelected)
            tmp$4 = this.selectedStyle_azbd0r$;
          else
            tmp$4 = this.unselectedStyle_t5roge$;
          var itemStyle = tmp$4;
          var tmp$5;
          line.text = (tmp$5 = Kotlin.kotlin.collections.getOrNull_3iu80n$(items, i_0)) != null ? tmp$5 : '';
          line.setStyle(itemStyle);
          line.position = new PIXI.Point(offset, i_0 * this.lineHeight);
        }
        this.cursor_9pzpy9$.position = new PIXI.Point(0, (this.cursorPosition - this.scrollPosition) * this.lineHeight);
        var scrollProgress = (this.dialog.clientHeight - Kotlin.numberToDouble(this.scroller_lm1q9x$.height)) * this.scrollPosition / (items.size - 1);
        this.scroller_lm1q9x$.position = new PIXI.Point(this.dialog.clientWidth - Kotlin.numberToDouble(this.scroller_lm1q9x$.width) / 2, scrollProgress);
      },
      moveCursor_za3lpa$: function (shift) {
        var newPosition = _.clamp_n6qkdc$(this.cursorPosition + shift, 0, Kotlin.kotlin.collections.get_lastIndex_a7ptmv$(this.items));
        if (this.cursorPosition !== newPosition) {
          this.cursorPosition = newPosition;
          this.scrollPosition = _.clamp_n6qkdc$(this.scrollPosition, this.cursorPosition - this.displayCount + 1, this.cursorPosition);
          this.update();
          return true;
        }
        return false;
      },
      toggleSelection: function () {
        if (this.selection_4kwsv3$.contains_za3rmp$(this.cursorPosition)) {
          this.selection_4kwsv3$.remove_za3rmp$(this.cursorPosition);
        }
         else {
          this.selection_4kwsv3$.add_za3rmp$(this.cursorPosition);
        }
        this.update();
      }
    }, /** @lends _.ListView */ {
      Companion: Kotlin.createObject(null, function () {
        _.ListView.Companion.cursorColor = 'orange';
        _.ListView.Companion.selectedColor = 'khaki';
        _.ListView.Companion.unselectedColor = 'whitesmoke';
      }),
      object_initializer$: function () {
        _.ListView.Companion;
      }
    }),
    PropertyView: Kotlin.createClass(function () {
      return [_.TextView];
    }, function $fun(dialog) {
      $fun.baseInitializer.call(this);
      this.dialog = dialog;
      this._entry_qf0nfr$ = null;
      this.lineHeight = _.TextView.Companion.fontSize * 1.6;
      this.style_uya8sd$ = new _.TextStyle('wheat', false, void 0, _.TextView.Companion.font);
      this.texts_uykg1e$ = Kotlin.kotlin.collections.arrayListOf_9mqe4v$([]);
      var text = this.dialog.add_68gber$(new PIXI.Text('Properties', this.style_uya8sd$));
      this.center(text);
    }, /** @lends _.PropertyView.prototype */ {
      entry: {
        get: function () {
          return this._entry_qf0nfr$;
        },
        set: function (v) {
          if (!Kotlin.equals(this._entry_qf0nfr$, v)) {
            this._entry_qf0nfr$ = v;
            this.update();
          }
        }
      },
      center: function (item) {
        item.position = new PIXI.Point((this.dialog.clientWidth - Kotlin.numberToDouble(item.width)) / 2.0, item.position.y);
      },
      update: function () {
        var tmp$1;
        var tmp$2;
        tmp$2 = this.texts_uykg1e$.iterator();
        while (tmp$2.hasNext()) {
          var element = tmp$2.next();
          this.dialog.remove_68gber$(element);
        }
        var entry = this._entry_qf0nfr$;
        if (entry != null) {
          if (!entry.properties.isEmpty()) {
            tmp$1 = Kotlin.kotlin.collections.withIndex_q5oq31$(entry.properties).iterator();
            while (tmp$1.hasNext()) {
              var tmp$0 = tmp$1.next()
              , i = tmp$0.component1()
              , property = tmp$0.component2();
              var tmp$3 = this.texts_uykg1e$;
              var tmp$4 = this.dialog;
              var $receiver_1 = new PIXI.Text(property.propertyName(), this.style_uya8sd$);
              $receiver_1.position = new PIXI.Point(0, (i * 3 + 2) * this.lineHeight);
              tmp$3.add_za3rmp$(tmp$4.add_68gber$($receiver_1));
              var tmp$5 = this.texts_uykg1e$;
              var tmp$6 = this.dialog;
              var $receiver_2 = new PIXI.Text(property.toString(), this.style_uya8sd$);
              $receiver_2.position = new PIXI.Point(_.TextView.Companion.fontSize * 1.5, (i * 3 + 3) * this.lineHeight);
              tmp$5.add_za3rmp$(tmp$6.add_68gber$($receiver_2));
            }
          }
           else {
            var tmp$7 = this.dialog;
            var $receiver_3 = new PIXI.Text('<None>', this.style_uya8sd$);
            $receiver_3.position = new PIXI.Point(0, 2 * this.lineHeight);
            var text = tmp$7.add_68gber$($receiver_3);
            this.center(text);
            this.texts_uykg1e$.add_za3rmp$(text);
          }
        }
      }
    }, /** @lends _.PropertyView */ {
    }),
    KeyCodes: Kotlin.createObject(null, function () {
      this.Space = 32;
      this.Shift = 16;
      this.Backspace = 8;
      this.Enter = 13;
      this.Escape = 27;
      this.Left = 37;
      this.Up = 38;
      this.Right = 39;
      this.Down = 40;
      this.W = 87;
      this.A = 65;
      this.S = 83;
      this.D = 68;
      this.P = 80;
      this.R = 82;
      this.U = 85;
    }),
    get_length_p6y9k$: {value: function ($receiver) {
      return $receiver.endInclusive - $receiver.start;
    }},
    Event: Kotlin.createClass(null, function () {
      this.handlers_bpsnkt$ = Kotlin.kotlin.collections.emptyList();
    }, /** @lends _.Event.prototype */ {
      raise: function () {
        var tmp$0;
        tmp$0 = this.handlers_bpsnkt$.iterator();
        while (tmp$0.hasNext()) {
          var handler = tmp$0.next();
          handler();
        }
      },
      plusAssign_qshda6$: function (handler) {
        this.handlers_bpsnkt$ = Kotlin.kotlin.collections.plus_ukps2u$(this.handlers_bpsnkt$, handler);
      }
    })
  });
  Kotlin.defineModule('LD36', _);
  _.main_kand9s$([]);
  return _;
}(kotlin);
