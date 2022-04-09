<h1>
fluent-event <a href="https://npmjs.org/package/fluent-event"><img src="https://img.shields.io/badge/npm-v2.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-111-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/fluent-event@2.0.0/dist/fluent-event.min.js"><img src="https://img.shields.io/badge/brotli-459b-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Fluent DOM event toolkit.

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i fluent-event </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add fluent-event </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add fluent-event</code>
</td></tr></table>
</h4>

## API

<p>  <details id="EventListener$6" title="TypeAlias" ><summary><span><a href="#EventListener$6">#</a></span>  <code><strong>EventListener</strong></code>    </summary>  <a href="src/event.ts#L3">src/event.ts#L3</a>  <ul><p><details id="__type$7" title="Function" ><summary><span><a href="#__type$7">#</a></span>  <em>(this, event)</em>    </summary>    <ul>    <p>    <details id="this$9" title="Parameter" ><summary><span><a href="#this$9">#</a></span>  <code><strong>this</strong></code>    </summary>    <ul><p><a href="#T$12">T</a></p>        </ul></details><details id="event$10" title="Parameter" ><summary><span><a href="#event$10">#</a></span>  <code><strong>event</strong></code>    </summary>    <ul><p><a href="#E$11">E</a></p>        </ul></details>  <p><strong></strong><em>(this, event)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details></p>        </ul></details><details id="Fn$52" title="TypeAlias" ><summary><span><a href="#Fn$52">#</a></span>  <code><strong>Fn</strong></code>    </summary>  <a href="src/types.ts#L1">src/types.ts#L1</a>  <ul><p><details id="__type$53" title="Function" ><summary><span><a href="#__type$53">#</a></span>  <em>(args)</em>    </summary>    <ul>    <p>    <details id="args$55" title="Parameter" ><summary><span><a href="#args$55">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p><a href="#P$56">P</a></p>        </ul></details>  <p><strong></strong><em>(args)</em>  &nbsp;=&gt;  <ul><a href="#R$57">R</a></ul></p></p>    </ul></details></p>        </ul></details><details id="debounce$1" title="Function" ><summary><span><a href="#debounce$1">#</a></span>  <code><strong>debounce</strong></code><em>()</em>     &ndash; Decorate function <code>fn</code> with debounce delay <code>ms</code>.</summary>  <a href="src/debounce.ts#L22">src/debounce.ts#L22</a>  <ul>    <p>  <p>

Flags: `first` => run `fn` first, then debounce

```ts
fn = (x: number) => console.log(x)
// => runs `fn` after 100ms following last call
cb = debounce()(fn, 100)
cb(1)
cb(2) // <- cb(2) wins, prints `2`

// => runs `fn` first then debounces until 100ms of inactivity
cb = debounce().first(fn, 100)
cb(1) // <- cb(1) wins, prints `1`
cb(2)
```

</p>
    <p><strong>debounce</strong><em>()</em>  &nbsp;=&gt;  <ul><span>Fluent</span>&lt;<details id="__type$3" title="Function" ><summary><span><a href="#__type$3">#</a></span>  <em>(args)</em>    </summary>    <ul>    <p>    <details id="args$5" title="Parameter" ><summary><span><a href="#args$5">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details>  <p><strong></strong><em>(args)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details>, <span>Flags</span>&lt;<code>"first"</code>&gt;&gt;</ul></p></p>    </ul></details><details id="event$13" title="Function" ><summary><span><a href="#event$13">#</a></span>  <code><strong>event</strong></code><em>()</em>     &ndash; Decorates event listener <code>fn</code>.</summary>  <a href="src/event.ts#L23">src/event.ts#L23</a>  <ul>    <p>  <p>

Flags:

- `prevent` => `event.preventDefault()`
- `stop` => `event.stopPropagation()`
- `stop.immediate` => `event.stopImmediatePropagation()`

```ts
btn.onclick = event()(fn)
btn.onclick = event().prevent(fn)
btn.onclick = event().prevent.stop(fn)
btn.onclick = event().stop.immediate(fn)
```

</p>
    <p><strong>event</strong><em>()</em>  &nbsp;=&gt;  <ul><span>Fluent</span>&lt;<details id="__type$15" title="Function" ><summary><span><a href="#__type$15">#</a></span>  <em>(args)</em>    </summary>    <ul>    <p>    <details id="args$17" title="Parameter" ><summary><span><a href="#args$17">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details>  <p><strong></strong><em>(args)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details>, <span>Flags</span>&lt;<code>"prevent"</code> | <code>"stop"</code> | <code>"immediate"</code>&gt;&gt;</ul></p></p>    </ul></details><details id="off$23" title="Function" ><summary><span><a href="#off$23">#</a></span>  <code><strong>off</strong></code><em>(el, type, listener, options)</em>     &ndash; Removes an event <code>listener</code> of type <code>type</code> from <code>el</code> using <code>options</code>.</summary>  <a href="src/on.ts#L53">src/on.ts#L53</a>  <ul>    <p>    <details id="el$27" title="Parameter" ><summary><span><a href="#el$27">#</a></span>  <code><strong>el</strong></code>    </summary>    <ul><p><a href="#T$25">T</a></p>        </ul></details><details id="type$28" title="Parameter" ><summary><span><a href="#type$28">#</a></span>  <code><strong>type</strong></code>    </summary>    <ul><p><a href="#K$26">K</a></p>        </ul></details><details id="listener$29" title="Function" ><summary><span><a href="#listener$29">#</a></span>  <code><strong>listener</strong></code><em>(ev)</em>    </summary>    <ul>    <p>    <details id="ev$32" title="Parameter" ><summary><span><a href="#ev$32">#</a></span>  <code><strong>ev</strong></code>    </summary>    <ul><p><span>HTMLElementEventMap</span>  [<a href="#K$26">K</a>]</p>        </ul></details>  <p><strong>listener</strong><em>(ev)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details><details id="options$33" title="Parameter" ><summary><span><a href="#options$33">#</a></span>  <code><strong>options</strong></code>    </summary>    <ul><p>boolean | <span>AddEventListenerOptions</span></p>        </ul></details>  <p><strong>off</strong>&lt;<span>T</span><span>&nbsp;extends&nbsp;</span>     <span>HTMLElement</span>, <span>K</span>&gt;<em>(el, type, listener, options)</em>  &nbsp;=&gt;  <ul>void</ul></p></p>    </ul></details><details id="on$18" title="Function" ><summary><span><a href="#on$18">#</a></span>  <code><strong>on</strong></code><em>()</em>     &ndash; Adds a DOM event <code>listener</code> to an event <code>type</code> using <code>options</code> and returns its remover.</summary>  <a href="src/on.ts#L40">src/on.ts#L40</a>  <ul>    <p>  <p>

Flags: `active` | `capture` | `once` | `passive`

```ts
on()(btn, 'click', fn)
on().once(btn, 'click', fn)
on().passive(div, 'wheel', fn)

const off = on().passive.capture(btn, 'wheel', fn)
// ...later...
off() // remove listener
```

</p>
    <p><strong>on</strong><em>()</em>  &nbsp;=&gt;  <ul><span>Fluent</span>&lt;<details id="__type$20" title="Function" ><summary><span><a href="#__type$20">#</a></span>  <em>(args)</em>    </summary>    <ul>    <p>    <details id="args$22" title="Parameter" ><summary><span><a href="#args$22">#</a></span>  <code><strong>args</strong></code>    </summary>    <ul><p>any  []</p>        </ul></details>  <p><strong></strong><em>(args)</em>  &nbsp;=&gt;  <ul>any</ul></p></p>    </ul></details>, <span>Flags</span>&lt;<code>"active"</code> | <code>"capture"</code> | <code>"once"</code> | <code>"passive"</code>&gt;&gt;</ul></p></p>    </ul></details><details id="queue$34" title="Function" ><summary><span><a href="#queue$34">#</a></span>  <code><strong>queue</strong></code><em>()</em>     &ndash; Queue.</summary>  <a href="src/queue.ts#L48">src/queue.ts#L48</a>  <ul>    <p>  <p>

All queue functions are also throttled to once per invocation.

```ts
// decorate function with `requestAnimationFrame`
const cbWithRaf = queue().raf(cb)

// decorate function with `setTimeout`
const cbWithTimeout = queue().time(cb)

// decorate function with `queueMicrotask`
const cbWithMicrotask = queue().task(cb)
```

</p>
    <p><strong>queue</strong><em>()</em>  &nbsp;=&gt;  <ul>{<p>  <details id="raf$37" title="Property" ><summary><span><a href="#raf$37">#</a></span>  <code><strong>raf</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>    <ul><p><details id="__type$38" title="Function" ><summary><span><a href="#__type$38">#</a></span>  <em>(fn)</em>    </summary>    <ul>    <p>    <details id="fn$41" title="Parameter" ><summary><span><a href="#fn$41">#</a></span>  <code><strong>fn</strong></code>    </summary>    <ul><p><a href="#Fn$52">Fn</a>&lt;<a href="#P$40">P</a>, any&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>P</span>&gt;<em>(fn)</em>  &nbsp;=&gt;  <ul><a href="#Fn$52">Fn</a>&lt;<a href="#P$40">P</a>, void&gt;</ul></p></p>    </ul></details></p>        </ul></details><details id="task$47" title="Property" ><summary><span><a href="#task$47">#</a></span>  <code><strong>task</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>    <ul><p><details id="__type$48" title="Function" ><summary><span><a href="#__type$48">#</a></span>  <em>(fn)</em>    </summary>    <ul>    <p>    <details id="fn$51" title="Parameter" ><summary><span><a href="#fn$51">#</a></span>  <code><strong>fn</strong></code>    </summary>    <ul><p><a href="#Fn$52">Fn</a>&lt;<a href="#P$40">P</a>, any&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>P</span>&gt;<em>(fn)</em>  &nbsp;=&gt;  <ul><a href="#Fn$52">Fn</a>&lt;<a href="#P$40">P</a>, void&gt;</ul></p></p>    </ul></details></p>        </ul></details><details id="time$42" title="Property" ><summary><span><a href="#time$42">#</a></span>  <code><strong>time</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>    <ul><p><details id="__type$43" title="Function" ><summary><span><a href="#__type$43">#</a></span>  <em>(fn)</em>    </summary>    <ul>    <p>    <details id="fn$46" title="Parameter" ><summary><span><a href="#fn$46">#</a></span>  <code><strong>fn</strong></code>    </summary>    <ul><p><a href="#Fn$52">Fn</a>&lt;<a href="#P$40">P</a>, any&gt;</p>        </ul></details>  <p><strong></strong>&lt;<span>P</span>&gt;<em>(fn)</em>  &nbsp;=&gt;  <ul><a href="#Fn$52">Fn</a>&lt;<a href="#P$40">P</a>, void&gt;</ul></p></p>    </ul></details></p>        </ul></details></p>}</ul></p></p>    </ul></details></p>

## Credits

- [fluent-flags](https://npmjs.org/package/fluent-flags) by [stagas](https://github.com/stagas) &ndash; Decorates a function with arbitrary fluent boolean flags and passes them as the first parameter.

## Contributing

[Fork](https://github.com/stagas/fluent-event/fork) or [edit](https://github.dev/stagas/fluent-event) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
