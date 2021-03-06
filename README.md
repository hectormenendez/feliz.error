# [@gik/tools-thrower](http://gik.mx) *0.1.12*
> Errors with pretty stack and customizable name. Part of our [tools suite](https://github.com/gikmx/tools).

##### Contributors
- [Héctor Menéndez](mailto:hector@gik.mx) []()

##### Supported platforms
- linux
- darwin

#### <a name="table-of-contents"></a> Table of contents
- **[thrower](#thrower)** Errors with pretty stack and customizable name.


# <a name="thrower"></a> thrower

Errors with pretty stack and customizable name.
> - [Standalone version](https://github.com/gikmx/tools-streamer).
> - [Report a Bug](https://github.com/gikmx/tools-streamer/issues).

###### Parameters
<table>
    <tr>
        <td style="white-space: nowrap;">
            <code>subject</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#string">string</a> | 
                <a href="#Array">Array</a> | 
                <a href="#Error">Error</a>
        </td>
        <td>The message or an Error instance to beautify.
When an array is sent, replace subject ALA printf. signature:<code>[subject, ...replacements]</code></td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>[name]</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#string">string</a>
        </td>
        <td>An identifier for the error instance. <b>Default <code>'Error'</code></b></td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>[throws]</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#boolean">boolean</a>
        </td>
        <td>If false, return error instance instead of throwing. <b>Default <code>true</code></b></td>
    </tr>
</table>


###### Returns
 [`Error`](#Error) <span style="font-weight:normal"> - A custom error instance with a pretty stack.</span>
###### Example 
```js
Thrower('test'); // A standard Error with prettified stack
Thrower(new TypeError('test2')); // Standard TypeError with prettified stack
Thrower('test3', 'TestError'); // Custom TestError with 'test3' as message
Thrower(['hola %s', 'mundo'], 'HelloError'); // HelloError with 'hola mundo' as message
const Err = Thrower('bad boy', 'CanineError', false); // Returns CanineError instance.
```

<small>**[▲ Top](#table-of-contents)**</small>

---

