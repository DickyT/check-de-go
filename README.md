# Check de Go [![GitHub license](https://img.shields.io/badge/license-GPL-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

Yet another check generation & printing app written by electron react & typescript.

* **OPEN SOURCE and FREE:** This software is completely open source and **FREE**, and nobody will steal your senstive information.
* **CUSTOMIZEABLE:** It is super easy to use `css` to customize your check.
* **Download Once, Print Anywhere:** Print your check without visiting a Bank, without waiting, without paying.

## Download

For now only macOS bundle is provided, I am still trying to see how to do cross compling on macOS.

Source code is cross-platform ready, feel free to compile yourself.

[Latest Releases](https://github.com/DickyT/check-de-go/releases/tag/1.0.0)

## Screenshots

<img width="1136" alt="Screen Shot 2019-03-30 at 5 52 53 AM" src="https://user-images.githubusercontent.com/4535844/55274646-bcfe1280-52b0-11e9-932d-ef0609ccd81b.png">

The below check is generated using my [customized theme](https://gistcdn.githack.com/DickyT/a41f58ad4bc704d4791fff7b842a8539/raw/e168afec91b693ab580ef0ef2e74063d972a6be1/miku.css) which override the original background.

<img width="1652" alt="Screen Shot 2019-03-30 at 5 56 57 AM" src="https://user-images.githubusercontent.com/4535844/55274647-bcfe1280-52b0-11e9-9bbf-cbddbb0a00d7.png">

We also generate printer-friendly copies.

<a href="https://user-images.githubusercontent.com/4535844/55274668-136b5100-52b1-11e9-8bf4-b95f61c3bb35.png" target="_blank">Letter size ready-to-print PNG</a>

## Customize your check

[Theme megathread](https://github.com/DickyT/check-de-go/issues/1)

Our check comes with a [default stylesheet](https://github.com/DickyT/check-de-go/blob/master/src/static/all.css), you can override any stylesheet property which related to check rendering.

A sample css theme is attached below, this css theme overrides the original background.

```css
.check {
  background: url(https://www.ps4wallpapers.com/wp-content/uploads/2018/01/PS4Wallpapers.com_5a5c529019255_b271f9267d1cf955d326b25743c167db.png);
}
```

You can absolutely change the font, font-size, or even check size.

For your convenience, please clone the project, run the electron app with `npm run start`, a Chrome Dev Panel will be the best tool for you to create a customized theme.

## Contributing

We are always looking for contributions, whether it's through bug reports, code, feature request. Please submit everything through GitHub issue.

## Credits

App icon is from [Flaticon](https://www.flaticon.com/free-icon/cheque_1101564#term=cheque&page=2&position=39), author is [@itim2101](https://www.flaticon.com/authors/itim2101). Use under [Flaticon Basic License](https://file000.flaticon.com/downloads/license/license.pdf).
