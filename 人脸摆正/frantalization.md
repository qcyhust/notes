Effective Face Frontalization in Unconstrained Images  
在无约束图片中的有效人脸摆正
* Tal Hassner   
* Shai Harel   
* Eran Paz
* Roee Enbar

## Frontalization
![frontalization_asbtract](imgs/frontalization_asbtract.png)  
"Frontalization"是将正脸和无约束的人脸照片合成的过程。研究发现这个过程可能会大幅提高人脸识别系统的性能。  
以前frontalization试图为每个输入图片建立一个3D模型，然后发现这种实现会很困难，而且用意引起面部失调。  
作者探索使用单一的更简单的方法给输入得图片建立近似三维的表面模型。    

## 完整过程
![frontalization_process](imgs/frontalization_process.png)

a：输入图片  
b：面部特征点检测  
c：点位人脸特征点，渲染成一个3D计算机模型  
d、e：建立一个从2D到3D的投影矩阵  
f：正脸覆盖后，计算出面部非正脸部分的可见性，热点图表示非正脸的像素，这些区域的图片借助脸部对称的位置显示  
g：输出的正脸摆正结果

## 人脸摆正中的重难点
人脸的检测使用现成的特征检测结果，然后在正确的坐标系统中调整。
#### 生成正脸图
采用兼顾速度和特征检测准确性的SDM算法，画出的面部特征点没有包括下巴，使得特征点接近3D平面的正面。  
3D模型是用投影矩阵CM = AM [RM tM]给出。
//todo: projection matrix
#### 对称处理和能见度估算
头部的旋转会使得部分面部的可见度比其他地方更小，特别是鼻子和头部的边缘。这时需要做一些处理：
![frontalization_occlusion](imgs/frontalization_occlusion.png)

a：输入图片  
b：在面部特征点闭合的地方会出现类似涂抹的痕迹  
c：借助闭合检测和脸部对称输出的图片

估算可见度：使用类似于采用多视图三维重建的方法，使用一个与3D相似的模型和平面IR来计算IQ的可见度。
![frontalization_model](imgs/frontalization_model.png)

参考坐标IR中的像素点q3和q4都被影射到输入图片的平面IQ上的像素点q，所以它们的可见度会更低。它们对称的点q1和q2用来预测他们在正面视图中应出现的位置。

![frontalization_visiable](imgs/frontalization_visiable.png)

a：输入图片  
b：计算覆盖在原始图片上的可见度，热点图表示可见度更少的区域  
c：对称后的正脸  
#### 进一步对称处理
对称处理能得到想要的结果，但是在一些特殊的图片中，还需要进一步处理。
![frontalization_correct](imgs/frontalization_correct.png)
这两张图可以看出，对称处理后不是我们想要的结果，需要检测出对称的错误。  
//todo:SVM LBP LFW
