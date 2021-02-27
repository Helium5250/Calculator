# Calculator

[Live Preview](https://helium5250.github.io/Calculator/)

[The Odin Project](https://www.theodinproject.com/)

---

Wonder how I did the border illumination effect? A lot of manual hacks...

- button:before for an invisible border
- button:after for the gap between button
- invisible border have negative z index while the rest have 0 z index
- a diffusing glow with negative z index follows the cursor, so it will only "illuminate" the invisible border while display behind everything else

Worth it.
