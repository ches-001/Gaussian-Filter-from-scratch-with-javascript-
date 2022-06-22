# Gaussian Filter from scratch with javascript

This program applies a gaussian filter to a given image on the webpage.

The gaussian kernel is a 2-dimensional matrix generated with the formula below and applied to the pixels of any given HxW image:

![gaussian filter formula](https://user-images.githubusercontent.com/70514310/175166175-3a9493f3-382a-4b77-b51e-c3911385e25c.png)

where x is the distance from the origin in the horizontal axis, y is the distance from the origin in the vertical axis, and σ is the standard deviation of the Gaussian distribution.

The time complexity of this program is $$ O(H * W * m * n) $$. Where H and W are the image width and height and m and n are kernel width and height.
The program can be very slow depending on the image and kernel dimensions.


### Demo Video:

https://user-images.githubusercontent.com/70514310/175165104-0709a310-ea4c-41ec-823e-e435b3476de8.mp4

