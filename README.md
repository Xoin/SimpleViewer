# SimpleViewer

SimpleViewer is a comic viewer written in JavaScript. Most comic viewers have horrible UIs or are linked to a platform. SimpleViewer will just work in any modern browser with JavaScript.

![Image of SimpleViewer frontpage with item selected and two reading items in the background](https://i.imgur.com/4BtfdVL.png)

## Features
- The database it uses is just a JavaScript file, you can edit this by hand or generate the right format. So you can just keep it on your filesystem or host it with the benefit of it working as a web app.
- It stores your comic book progress in a local storage.
- It preloads the previous and next page images.
- The database can indicate which page should be used as the cover.
- Spinoffs can be grouped under the main series.
- While you never leave the same page you can link or bookmark pages. It will only save progress on page change.
- It list the comics you are reading at the top.
- It will always request jpg, png and gif. It does this because file types are not stored in the database.
- It has keyboard navigation. (Arrow left, Arrow right, spacebar to go home)
- Displaying double pages, sort of.
- It should just scale fine
- Lots of uncommented code!

## Database and folders

### Folders
You put the comics in named folders. Every numbered folder will count as a volume of the comic. Nonnumeric folders are counted as grouping, folders under it should be numeric.


Comics/Pepper and Carrot/1/1.jpg

Comics/Pepper and Carrot/The spin off/1/1.jpg

The files need to be jpg, png or gif. Viewer.js can be edited to remove or add more. The names are numeric 1.png...222.png.

The Thumb folder follows the same rules but thumbnails also have _thumb in its name.


Thumb/Comics/Pepper and Carrot/1/1_thumb.png

Thumb/Comics/Pepper and Carrot/The spin off/1/1_thumb.png


### Database

A comic follows the below format.

- name: if filled it will overide the normal display name.
- volume: volume 0 should always be there, if pages is set to 0 it will never show it.
- pages: the exact number of the ammount of images the volume folder has. If zero it hidden.
- currentpage: its possible to skip the first few pages, default should be 1.
- cover: overides the cover shown as thumb or preview.

```javascript
myMedia = {
	"Pepper and Carrot": [
		{
			"Volumes": [
				{ "name": "", "volume": 0, "Series": "Pepper and Carrot", "pages": 0, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 1, "Series": "Pepper and Carrot", "pages": 10, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 2, "Series": "Pepper and Carrot", "pages": 20, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 3, "Series": "Pepper and Carrot", "pages": 30, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 4, "Series": "Pepper and Carrot", "pages": 40, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 5, "Series": "Pepper and Carrot", "pages": 50, "currentpage": 1, "cover": 0 }
			],
		}
    ],
}
```
Groupings are placed under subs.
```javascript
myMedia = {
	"Pepper and Carrot": [
		{
			"Volumes": [
				{ "name": "", "volume": 0, "Series": "Pepper and Carrot", "pages": 0, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 1, "Series": "Pepper and Carrot", "pages": 10, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 2, "Series": "Pepper and Carrot", "pages": 20, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 3, "Series": "Pepper and Carrot", "pages": 30, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 4, "Series": "Pepper and Carrot", "pages": 40, "currentpage": 1, "cover": 0 },
				{ "name": "", "volume": 5, "Series": "Pepper and Carrot", "pages": 50, "currentpage": 1, "cover": 0 }
			],
        },
        {
			"Sub": [
				{
					"The Potion of Flight": [
						{ "name": "", "volume": 0, "Series": "The Potion of Flight", "pages": 0, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 1, "Series": "The Potion of Flight", "pages": 10, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 2, "Series": "The Potion of Flight", "pages": 20, "currentpage": 1, "cover": 0 }
					],
					"Rainbow Potions": [
						{ "name": "", "volume": 0, "Series": "Rainbow Potions", "pages": 0, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 1, "Series": "Rainbow Potions", "pages": 10, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 2, "Series": "Rainbow Potions", "pages": 20, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 3, "Series": "Rainbow Potions", "pages": 30, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 4, "Series": "Rainbow Potions", "pages": 40, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 5, "Series": "Rainbow Potions", "pages": 50, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 6, "Series": "Rainbow Potions", "pages": 60, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 7, "Series": "Rainbow Potions", "pages": 70, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 8, "Series": "Rainbow Potions", "pages": 80, "currentpage": 1, "cover": 0 }
					],
					"The Secret Ingredients": [
						{ "name": "", "volume": 0, "Series": "The Secret Ingredients", "pages": 0, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 1, "Series": "The Secret Ingredients", "pages": 10, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 2, "Series": "The Secret Ingredients", "pages": 20, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 3, "Series": "The Secret Ingredients", "pages": 30, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 4, "Series": "The Secret Ingredients", "pages": 40, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 5, "Series": "The Secret Ingredients", "pages": 50, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 6, "Series": "The Secret Ingredients", "pages": 60, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 7, "Series": "The Secret Ingredients", "pages": 70, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 8, "Series": "The Secret Ingredients", "pages": 80, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 9, "Series": "The Secret Ingredients", "pages": 90, "currentpage": 1, "cover": 0 },
						{ "name": "", "volume": 10, "Series": "The Secret Ingredients", "pages": 10, "currentpage": 1, "cover": 0 }
					]
				}
			]
		},
    ],
}
```

Deleting it from the database doesn't mean it removes it from the local storage.
