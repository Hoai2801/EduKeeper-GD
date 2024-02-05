import React from "react";

const Hero = () => {
  return (
    <section class="bg-white dark:bg-gray-900 rounded-xl">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7 pl-10">
          <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Sự chia sẽ hôm nay là nền tảng cho ngày mai
          </h1>
          <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Mọi tài liệu mà bạn chia sẽ đều đáng quý
          </p>
          <a
            href="/upload"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-400 border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Upload tài liệu
          </a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://images.vexels.com/media/users/3/211098/isolated/preview/4deb66d28c41e0714ba11ebb1fef6c67-open-book-hand-drawn.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
