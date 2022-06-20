/**
 * MakeCode I2C RGB LCD 1602 package for microbit
 * Blocks for Sparkfun 16x2 SerLCD - RGB Backlight (Qwiic)
 * James A. Jerkins, 06/13/2022
 * https://github.com/evergreen22/csmakers
 */

/**
 * Custom blocks
 */
//% weight=20 color=#0fbc11 icon="\uf075"
namespace LcdRgb16x2 {
    let i2cAddr: number

    // send i2c one byte payload, openlcd just displays these bytes
    function xmitData(d: number, r: boolean): void {
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE, r)
        basic.pause(10)
    }

    // send i2c openlcd command sequence
    function xmitCommand(d: number, r: boolean): void {
        pins.i2cWriteNumber(i2cAddr, 0x7C, NumberFormat.Int8LE, true)
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE, r)
        basic.pause(25)
    }

    // send reposition cursor command sequence
    function moveCursor(x: number, y: number): void {
        let n: number
        n = 0x80 + x
        if (y > 0) {
            n += 0x40
        }
        pins.i2cWriteNumber(i2cAddr, 0xFE, NumberFormat.Int8LE, true)
        pins.i2cWriteNumber(i2cAddr, n, NumberFormat.Int8LE, false)
        basic.pause(25)
    }

    /**
     * Set the LCD's I2C address and perform a software reset. The default address is 0x72 (114).
     * @param addr is I2C address for LCD. eg: 114
     */
    //% blockId="I2C_LCD_1620_SET_ADDRESS" block="set LCD address %addr"
    //% weight=100 blockGap=8
    export function lcdInit(addr: number = 0x72): void {
        i2cAddr = addr
        basic.pause(1000)
        xmitCommand(0x08, false)
        basic.pause(2000)
    }

    /**
     * Clear the display and move the cursor to the top left position (home).
     */
    //% blockId="I2C_LCD_1620_CLEAR" block="clear LCD"
    //% weight=90 blockGap=8
    export function clearLCD(): void {
        xmitCommand(0x2D, false)
    }

    /**
     * Display a number on the LCD.
     * @param n is number to display
     */
    //% blockId="I2C_LCD_1620_SHOW_NUMBER" block="show number %n on LCD"
    //% weight=90 blockGap=8
    export function showNumber(n: number): void {
        let s = n.toString()
        showString(s)
    }

    /**
     * Display text on the LCD.
     * @param s is the string to display
     */
    //% blockId="I2C_LCD_1620_SHOW_STRING" block="show string %s on LCD"
    //% weight=90 blockGap=8
    export function showString(s: string): void {
        for (let i = 0; i < s.length; i++) {
            xmitData(s.charCodeAt(i), false)
        }
    }

    /**
     * Position the LCD cursor to (x,y).
     * @param x [0-15] is the column position, eg: 0
     * @param y [0-1] is the row position, eg: 0
     */
    //% blockId="I2C_LCD_1620_SET_CURSOR" block="move the LCD cursor to x %x  y %y"
    //% weight=80 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% x.fieldOptions.precision=1
    //% y.fieldOptions.precision=1
    export function setCursor(x: number, y: number): void {
        moveCursor(x, y)
    }

    /**
     * Turn on the LCD backlight.
     */
    //% blockId="I2C_LCD_1620_BACKLIGHT_ON" block="turn on LCD backlight"
    //% weight=70 blockGap=8
    export function backlightOn(): void {
        xmitCommand(0x9D, true)
        xmitCommand(0xBB, true)
        xmitCommand(0xD9, false)
    }

    /**
     * Turn off the LCD backlight.
     */
    //% blockId="I2C_LCD_1620_BACKLIGHT_OFF" block="turn off LCD backlight"
    //% weight=70 blockGap=8
    export function backlightOff(): void {
        xmitCommand(0x80, true)
        xmitCommand(0x9E, true)
        xmitCommand(0xBC, false)
    }

    /**
     * Set the LCD backlight brightness and color. This turns on the LCD backlight.
     * @param r [0-29] is the red level in the range of 0..29. eg: 0
     * @param g [0-29] is green level in the range of 0..29. eg: 0
     * @param b [0-29] is blue level in the range of 0..29. eg: 0
     */
    //% blockId="I2C_LCD_1620_BACKLIGHT_COLOR" block="set LCD backlight red %r green %g blue %b "
    //% weight=70 blockGap=8
    //% r.min=0 r.max=29
    //% g.min=0 g.max=29
    //% b.min=0 b.max=29
    //% r.fieldOptions.precision=1
    //% g.fieldOptions.precision=1
    //% b.fieldOptions.precision=1
    //% inlineInputMode=inline
    export function backlightColor(r: number, g: number, b: number): void {
        xmitCommand(0x80 + r, true)
        xmitCommand(0x9E + g, true)
        xmitCommand(0xBC + b, false)
    }

    /**
     * Change the LCD system messages setting to on. This setting is remembered by the LCD.
     */
    //% blockId="I2C_LCD_1620_SYSTEM_MESSAGE_ON" block="LCD system messages on"
    //% advanced=true
    //% weight=60 blockGap=8
    export function systemMessagesOn(): void {
        basic.pause(1500)
        xmitCommand(0x2E, false)
        basic.pause(1500)
    }

    /**
     * Change the LCD system messages setting to off. This setting is remembered by the LCD.
     */
    //% blockId="I2C_LCD_1620_SYSTEM_MESSAGE_OFF" block="LCD system messages off"
    //% advanced=true
    //% weight=60 blockGap=8
    export function systemMessagesOff(): void {
        basic.pause(1500)
        xmitCommand(0x2F, false)
        basic.pause(1500)
    }
}
