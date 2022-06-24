# Sparkfun LCD with RGB Backlight

[Micro:bit extension for the [Sparkfun 16x2 SerLCD - RGB Backlight](https://www.sparkfun.com/products/16396) LCD Display]

![SparkFun 16x2 SerLCD - Black on RGB 3.3V (LCD-14072)](https://cdn.sparkfun.com//assets/parts/1/5/1/2/2/16396-SparkFun_16x2_SerLCD_-_RGB_Backlight__Qwiic_-05.jpg)

> Open this page at [https://evergreen22.github.io/pxt-lcd-rgb-16x2-i2c/](https://evergreen22.github.io/pxt-lcd-rgb-16x2-i2c/)

## How to use the Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/evergreen22/pxt-lcd-rgb-16x2-i2c** and import

### LCD Extension Example: Display the temperature in Fahrenheit every 5 seconds

```blocks
let Fahrenheit = 0
LcdRgb16x2.lcdInit(114)
LcdRgb16x2.backlightOn()
LcdRgb16x2.clearLCD()
basic.forever(function () {
    Fahrenheit = input.temperature() * 1.8 + 32
    LcdRgb16x2.showString("Temp: " + convertToText(Fahrenheit))
    LcdRgb16x2.setCursor(0, 0)
    basic.pause(5000)
})
```

## How do I connect the LCD display to the micro:bit?

Use a [Flexible Qwiic Cable](https://www.sparkfun.com/products/17912) and a micro:bit breakout with headers to connect your LCD display to the micro:bit with a breadboard.

Wire color | Connection
-----------|---------------
Red        | 3V (power)
Black      | GND (ground)
Blue       | P20 (SDA)
Yellow     | P19 (SCL)

## Why doesn't the LCD show anything with the `show string` block or `show number` block?

The LCD must be initialized before it will work. Initialize the display with the `set LCD address` block as shown below. The address is preset to the default.

```blocks
LcdRgb16x2.lcdInit(114)
```

## Why does the screen display each color when the backlight color is changed?

The LCD display has a feature called *System Messages* that is used to troubleshoot the display. Every time a display setting is changed it is confirmed on the display.

To turn system messages off, use the `LCD system messages off` block. The display remembers this setting so you only need to disable it once. If you want to turn it back on, use the `LCD system messages on` block.

```blocks
LcdRgb16x2.lcdInit(114)
LcdRgb16x2.systemMessagesOff()
```

## Why is the screen garbled sometimes?

LCD displays are very slow (in computer terms) and may take several milliseconds (ms) to complete a task. If your screen is garbled try turning off system messages (see the answer above) or inserting a pause before showing a number or text.

```blocks
LcdRgb16x2.lcdInit(114)
basic.pause(1000)
LcdRgb16x2.showString("Hello World")
```

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/evergreen22/pxt-lcd-rgb-16x2-i2c** and click import

LcdRgb16x2 extension Copyright (C) 2022 James A. Jerkins

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

