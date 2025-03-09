export function getThumbnail(hymnNumber: number) {
  for (let i = 0; i < thumbnailsRange.length; i++) {
    if (hymnNumber <= thumbnailsRange[i]) {
      return `/thumbnails/thumbnail_${i + 1}.webp`
    }
  }
  return '/thumbnails/thumbnail_1.webp'
}

const thumbnailsRange = [
  21, 34, 45, 47, 52, 59, 77, 92, 102, 106, 126, 157, 189, 203, 208, 237, 244,
  283, 310, 315, 344, 364, 372, 390, 438, 465, 473, 486, 490, 504, 520, 525,
  527, 533, 534, 550, 578, 580, 586, 587, 588, 589, 596, 597, 607, 613,
]
