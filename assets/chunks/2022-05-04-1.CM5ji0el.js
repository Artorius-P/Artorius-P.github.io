const n=`--- 
title: OpenCV C++ 学习笔记
date: 2022-05-04
lang: zh_CN
categories:
 - study
---

# OpenCV C++ 学习笔记

最近项目需要使用基于C++版本的OpenCV，又被迫开了一个新坑。

## OpenCV的编译安装

本来准备使用Arch仓库里自带的opencv，奈何编译出问题，只好自己编译。没想到一下就踩进另一个坑。

使用视频流输入输出需要使用ffmpeg，然而ffmpeg从4.x到5.x作出了巨大的改动，OpenCV4.5.5还没有支持5.x版本的ffmpeg。
导致编译到百分之三十多的时候会因为ffmpeg的api变了而报错。所以就需要自己指定ffmpeg版本。Arch仓库里自带了4.4版本的ffmpeg。先安装，然后要修改opencv的cmake文件。

在寻找ffmpeg的cmake代码\`opencv/modules/videoio/cmake/detect_ffmpeg.cmake\`的开头是这样的：

\`\`\`CMake
if(NOT HAVE_FFMPEG AND OPENCV_FFMPEG_USE_FIND_PACKAGE)
  if(OPENCV_FFMPEG_USE_FIND_PACKAGE STREQUAL "1" OR OPENCV_FFMPEG_USE_FIND_PACKAGE STREQUAL "ON")
    set(OPENCV_FFMPEG_USE_FIND_PACKAGE "FFMPEG")
  endif()
  find_package(\${OPENCV_FFMPEG_USE_FIND_PACKAGE}) # Required components: AVCODEC AVFORMAT AVUTIL SWSCALE
  if(FFMPEG_FOUND OR FFmpeg_FOUND)
    set(HAVE_FFMPEG TRUE)
  endif()
endif()
\`\`\`
其实就是用find_package来寻找ffmpeg，然而这样找到的版本就是5.x的，所以得改这段代码,
因为4.4没有对应的cmake文件，所以find_package是找不到的。但是它有pkg-config文件\`/usr/lib/ffmpeg4.4/pkgconfig/\`，
所以我们应该使用pkg-config来进行查找。

直接上代码。


\`\`\`CMake
if(NOT HAVE_FFMPEG AND OPENCV_FFMPEG_USE_FIND_PACKAGE)
  if(OPENCV_FFMPEG_USE_FIND_PACKAGE STREQUAL "1" OR OPENCV_FFMPEG_USE_FIND_PACKAGE STREQUAL "ON")
    #set(OPENCV_FFMPEG_USE_FIND_PACKAGE "FFMPEG")
    set(OPENCV_FFMPEG_USE_FIND_PACKAGE "PkgConfig REQUIRED")
  endif()
  set(ENV{PKG_CONFIG_PATH} /usr/lib/ffmpeg4.4/pkgconfig/)
  find_package(\${OPENCV_FFMPEG_USE_FIND_PACKAGE}) # Required components: AVCODEC AVFORMAT AVUTIL SWSCALE
  pkg_check_modules(LIBAV REQUIRED IMPORTED_TARGET
    libavdevice
    libavfilter
    libavformat
    libavcodec
    libswresample
    libswscale
    libavutil
)

  if(FFMPEG_FOUND OR FFmpeg_FOUND)
    set(HAVE_FFMPEG TRUE)
  endif()
endif()
\`\`\`
再次编译opencv，报错消失，问题解决。

## 后续
甲方也搞不定C++，妥协了，用Python了😅
`;export{n as default};
