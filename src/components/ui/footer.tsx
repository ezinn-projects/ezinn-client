import Image from "next/image";

const navigation = {
  connect: [
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "TikTok", href: "https://tiktok.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ],
  explore: [
    { name: "Nhạc Hot", href: "/hot" },
    { name: "BXH", href: "/charts" },
    { name: "Thể Loại", href: "/genres" },
    { name: "Nghệ Sĩ", href: "/artists" },
  ],
};

const TwoColumnFooter = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="font-inter w-full max-w-7xl bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8">
            <Image
              priority={true}
              unoptimized={true}
              width={100}
              height={40}
              src="/images/Screenshot_11-removebg-preview.png"
              alt="logo"
              className="h-7 w-auto"
            />

            <div className="flex space-x-6 text-sm text-gray-700  dark:text-gray-300">
              <div>Được phát triển với ❤️ bởi JOZO</div>
            </div>
          </div>
          {/* Navigations */}
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
            <div className="md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900  dark:text-gray-200">
                Kết Nối
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.connect.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  Khám Phá
                </h3>
                <div className="mt-6 space-y-4">
                  {navigation.explore.map((item) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-100/10">
          <p className="text-xs leading-5 text-gray-700 dark:text-gray-300">
            &copy; 2024 JOZO. Đã đăng ký bản quyền. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TwoColumnFooter;
