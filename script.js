/* =====================================================================
   UyMap — script.js
   ---------------------------------------------------------------------
   1) RASMLAR ........ uylarga rasm biriktirish (SHU YERDA O'ZGARTIRING)
   2) Til va tema .... uz/ru/en tarjimalar, tungi/kunduzgi rejim
   3) Ma'lumotlar .... tumanlar va 32 ta demo uy
   4) Xarita ......... o'z xaritamiz (koordinata, zoom, markerlar)
   5) Ro'yxat/filtr .. kartalar, filtrlar, saralash
   6) Detail sahifa .. galereya, xarita, yaqin uylar
   7) Kirish/Profil .. login, ro'yxatdan o'tish, e'lon berish
   8) Qidiruv, navigatsiya va tugmalar
   ===================================================================== */

/* ---------- 1) RASMLAR ----------------------------------------------
   Format:  "uy_id": ["rasm1", "rasm2", "rasm3"]
   - uy_id: p1 dan p32 gacha (masalan "p5")
   - rasm: images/ papkasidagi fayl nomi YOKI internet havolasi (https://...)
   - Bir uyga xohlagancha rasm qo'shing; birinchisi asosiy rasm bo'ladi
   - Rasm yozilmagan uylarda rangli demo rasm chiqadi
------------------------------------------------------------------- */
const RASMLAR = {
  p1: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuRATQgG9kTLZV4GJnEt_PQab9GEBbnIbPIo9cb2KNDQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQxZtv01CsC2fJGza2K6I3Un4W044TNDOADzw14ieFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJJL5g_udE-60Bu7AHPO0ICqIJsHKFGCYmKQDT4V6Ag&s",
  ], // Kvartira, 1 xona
  p2: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChOE9jxze_otrBG5nThOTlTGp84UIbMUTG_tODy3BPQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7P3ovwhYO68xU_LdcP4PPD0Hk92MsuEjO0rSejg4XtQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13qErvSvtICzp9PNX7OCDGbsPg77hNxdAJop5Hp7Pwg&s=10",
  ], // Hovli, 5 xona
  p3: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRusp0BnKURsB69Yk67snRK2xAKN-UdyjF9ei16fVSajg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgT0ov3jQmuA39lZxTTLgorujTi1uu8gyjn6_CpMSIXA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ea82K_BiNtLUCggQ8WIUkNY-O-8SwZcbLUmhRZKHKA&s",
  ], // Villa, 6 xona
  p4: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_JkV07h95asJwr3HiSRQFMg0PXSgvtj1Sanh02BNgA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStv2ROFCElCuWTKUNeZC01w_7UcbdpxZkV_RtyiGjPBQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3wdvGEY14ZTfGBdhnanmEDqY1PFyUHMW3LkUgkOJG7g&s",
  ], // Yangi uy, 4 xona
  p5: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2QxFGAHkSzpYJe9JPR_dVruE1DNHV3k2wcGT-Xw8-g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeItekwp3j6kNd2eUOXR9WlU3T_-HaUxT6KsLnbd66PQ&s",
    "https://frankfurt.apollo.olxcdn.com/v1/files/mh1n3hbqb5y13-UZ/image;s=960x1280",
  ], // Eski uy, 1 xona
  p6: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-o0QfsHolHkRJ9l5CsoSUV5uIev2FkZxcoG3_UHAJQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-inlUBmKoPKw3AqvtYFMyhWuQUPnBEmuwf13ujOLVcg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7iC8pdBX7vsKodioiqVg0lJdEty2JVNK7Qhg85ja51g&s",
  ], // Kvartira, 2 xona
  p7: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdLGtUuYYKB_4MkRwaqb9EApiOotgFFWgCkM7lwyipA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9nDfTfT1p1zMSxeOvykHUBQQzyCyHohdaf_KE2tdrw&s",
    "https://frankfurt.apollo.olxcdn.com/v1/files/hjva4zhobyb32-UZ/image;s=1280x1280",
  ], // Hovli, 4 xona
  p8: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGrxvM6qdBbnygpinVOvIg8_XYbm7nYRz8l5pia-WP9duNJ_7UanWPNn0&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRew8r4FtZwt3jhi7YPE61zbymlIFHbx2pgCIHF-JtZw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4WibLYjiJvCjFa5xNmcgRE68jSKmfqVlMjnvhyhuciw&s=10",
  ], // Villa, 5 xona
  p9: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvx5YIfn1o_1Er4mh2Xb4y1sHFSJ2zeRmvWqjSo9E_8g&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvWR-XCRGw__aHx-RNM5pzTzG6uTzPeTRlnBgYEsx8sw&s=10mages/p9_2.svg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB8BcaNjfql-LlD7Z-LsVXolNQlYRxoruPrwks0SKVkdsLdANShPzCgPc&s",
  ], // Yangi uy, 1 xona
  p10: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Lb8uJPUK4sShIorYe6GDPfFYKAIwYqSLeBOVhsirCQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeItekwp3j6kNd2eUOXR9WlU3T_-HaUxT6KsLnbd66PQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4aDaD7plgVKFVJaKRhOJHCv5j_P2EowsZ7W7J5uLLlA&s",
  ], // Eski uy, 2 xona
  p11: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpb1lFYYmnPa80V53mm-0xcYAXhnGzeU1PZ6plhLDEg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr9SxFU47fGrE03TRpeY17Hj3FUjF-cYi00hld_AUT_g&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtw6qdYcp8OE2egsdVRAR7MskRhzGeQbty0bQix4FCXg&s=10",
  ], // Kvartira, 3 xona
  p12: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MMBAbIWe_mbbRBUwnHMNJQjazUoZ7uBnOo7nejeTxQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8T2boH2jeDwf80kjvBdb4x7FSGiH1Z-t8F7uKUdRnQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFgmBjPA62D4cF371DMfQz-UfYTspa2qJ1vGvx8n-2dA&s=10",
  ], // Hovli, 6 xona
  p13: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTylXl3VCZ1Yx-qnUYIi9J8jJhCfpVvEdOVmuXp2yXQnw&s=10",
    "images/p13_2.svg",
    "images/p13_3.svg",
  ], // Villa, 4 xona
  p14: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbzNVtRlI8OULPkNAZuZP7AYmQNY-apoMFdS5eRHx4Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQILfItUVIFxcPSkOud9s_Ys0Df2k0nF75ALjqKnwi1TA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYDUB6Hpd2fzZVDlvaUI3jwLahIIvXcAD9aFx_sfRlWw&s",
  ], // Yangi uy, 2 xona
  p15: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05bxajTwrqiewdV24RX6CdsOJuyonWFl1bcWwaHi-eg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05bxajTwrqiewdV24RX6CdsOJuyonWFl1bcWwaHi-eg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoA9unqWlKv09y8TRP7JWhKty-Zm-Va8WIxNE14S7-w&s",
  ], // Eski uy, 3 xona
  p16: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IpFGaHY8igy6dr8curvzydYADxS41LlVFq-R0qiaXQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTCcRjQw6Or4dDvQz9yS9JzehaJaWM_uuRU4JP_5S4w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZUKxkGjG8S-n-D9ubSJBQO687cuwcVjQhGZ5ET35JLw&s",
  ], // Kvartira, 4 xona
  p17: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6heVJWnLLx1MyllwNcrZcCWHjDC7kofCEuyRVMBqoA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWUrIN_Cqtdechv6HJFSbYNfbtCWkBx591G55mvbsfBw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nml1YVAUNW_cfrWGShW6b1lRRx76X-xC875YfwrmQg&s=10",
  ], // Hovli, 5 xona
  p18: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf_jA-FG9Z7iHH-fZMcv5G-BYVm14by5tqNiH36uczMw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvIGb1Mpk65_8M4qttb5Vhy60OcbraVW6uHVzaIgxX9A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGahzDCHHxBtEZpcB6QtL2euDydz3FWPzw-JBdSgE-Qw&s",
  ], // Villa, 6 xona
  p19: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX2gHWHkFyrEw3fEfYCy7mRibfTZ8qnhcevnuAMb50w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNYe-3uV3UDnpq_ZQvD2YhhmJ5FQkyWeVdz7QAoVe-9Q&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGj61GpYNPn8xYXEdwTVHHxF75QshScQS11xYKoVwJQ&s",
  ], // Yangi uy, 3 xona
  p20: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ7Ru8OXrV9MaQPKc51AOS8VniEqD9XJglOAHfn4WOQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7A0rk9TpzNAwglnaJk4gmWCVB1-zePemaQaLpYXWRg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOho-WNr5PW4AZvCh19s4oqJZgu25GSLo_03TpUfB4Q&s",
  ], // Eski uy, 4 xona
  p21: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMouUYnG9RLYWBe_Z-Eb_nQDb9SoKDbHNBpthvJOftrUJPMFexPS4zUR1q&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTceRl_afbhlBcvkVI5k8vUgUhxYnDmF-GbbTeyWRCgew&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYy3fYFMsAh0WO89OYPqoR3T0leyAF-pdc1RWTqIvFQg&s",
  ], // Kvartira, 1 xona
  p22: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZziAjq190BdPWZAmQvmBPdHgODDOmtMxrA9D4HslYGw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7FoMONLAIAtx_IVMQuZ9xq7wvrYaUxwk7lPBUngOog&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUYFcOG62GEALhJ5h02D76Muft-vedISs5ni4pfXTmmQ&s",
  ], // Hovli, 4 xona
  p23: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRWu9Ckz6h7sbcckhmBVYh6lIDMuRRDxjpAX1tpf-Aw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYzf9CxYVpBd7EIWjRWwoTbMg_po1vryGFu4xfYA1vw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCnHdKUu6FjPuS7i-z-wIc8sul1-LxEco9zrM2LLy2JA&s=10",
  ], // Villa, 5 xona
  p24: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFnkH2xxF2pIrA92Ha7E6pQoa8GgNGA4Cer-y868Stiw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFcDYUc-DCEiLM1XFk2koopo1OzTtV2mflmK3-3YocMA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqAzgzylXZ8blemVbP_w2XxfYQcD0ljVa9ioMARvm_Fw&s",
  ], // Yangi uy, 4 xona
  p25: [
    "https://frankfurt.apollo.olxcdn.com/v1/files/m60p3m94c0331-UZ/image;s=765x1020",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSiwk5wCVePIOPfSVeXLHh3vdLab0jlDXYlP8xYfS0g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSw1Z9gRiweUX_dhh0T8z4p3djvVMdanQn2kHvhSQjzg&s",
  ], // Eski uy, 1 xona
  p26: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn46anintcXqccHmCF89C_r4jbChX4iKrCI3KYgmOR-Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqyDBOZ5pf5MF4Nf64WaLxSdkx21lDcCApuSGk0eHeA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpDihMYXU0lfht1BThvk-Wn1LAUkSUQKwD-sJ74u1cvg&s=10",
  ], // Kvartira, 2 xona
  p27: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3FGlYWi_iuyjKvnACUZmX1yH0t20l3hNRDVmzS-Ejw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDev1HQxNY4cloK1Zf4Q3uxLUHA2M0tEjciYNX6WUm0w&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZetrH9i1bW19t4IIArmG5XvNSsRwPEBPVBf-ntbc6MQ&s=10",
  ], // Hovli, 6 xona
  p28: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrE9yr1bhCeV5ycoDXBOjbmR18OAw9sgfFNx4-9UWAw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_-0k_Mmy1t_g4D50rauUzirogqgizFLwJyst_ASSLag&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo9VnUXtForkqCd8Td-nfwQc3e-D7mbZcn2gJs1j1TCg&s=10",
  ], // Villa, 4 xona
  p29: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RX2Dsm9vaj8osniO8PPAX8Ghp5pqWAVnZf8slXedug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrtW-0cTxmvqqQ3dyxTZlEQGGSr15bh-SiLMya4dBOmLnDUANf0sqzkpk&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB8BcaNjfql-LlD7Z-LsVXolNQlYRxoruPrwks0SKVkdsLdANShPzCgPc&s",
  ], // Yangi uy, 1 xona
  p30: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncJvdzCvf4weFRkFG4QmDCxBBtXWFry932OXOkdTlyA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-L6ho8tKmMWvHVjhgdrbkIGwWD3vGFzoGqWbdL17tw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnycyST2hathAEafmy_QCbF42cX4GIpJ4LU2UIPoo4HA&s",
  ], // Eski uy, 2 xona
  p31: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbE0NEgdh8O2lwQ_ruAtVIwZ6MmR3G_mP6bv3FefC3jQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr9SxFU47fGrE03TRpeY17Hj3FUjF-cYi00hld_AUT_g&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttAFFQCBpNoB2_AHP8go9cBPPS90Bfuhn50gw_GajKQ&s",
  ], // Kvartira, 3 xona
  p32: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJtwDDJkZz-hEq4nUJ_R8dQBNEGKTQA6EZeCxFmNd0A&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzi8NZ5Szlvo4hUFulfgRaplgatNEUixt05PSQZ9MKiQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWCnLhaiQ2P14Ezs66nV6eEBsufjm14Ujgl-TFSwCdJQ&s",
  ], // Hovli, 5 xona
};
/* Talabalar bo'limi (p201-p208) uchun alohida rasm yasalmaydi — mavjud uylarning rasmlari qaytadan ishlatiladi */
RASMLAR.p201 = RASMLAR.p1;
RASMLAR.p202 = RASMLAR.p6;
RASMLAR.p203 = RASMLAR.p11;
RASMLAR.p204 = RASMLAR.p16;
RASMLAR.p205 = RASMLAR.p21;
RASMLAR.p206 = RASMLAR.p26;
RASMLAR.p207 = RASMLAR.p31;
RASMLAR.p208 = RASMLAR.p9;
const nimg = (p) =>
  p.images && p.images.length
    ? p.images.length
    : (RASMLAR[p.id] || [0, 0, 0]).length;
function readImgResized(file, max = 1000, q = 0.72) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        let w = img.width,
          h = img.height;
        if (w > max || h > max) {
          if (w > h) {
            h = Math.round((h * max) / w);
            w = max;
          } else {
            w = Math.round((w * max) / h);
            h = max;
          }
        }
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        res(c.toDataURL("image/jpeg", q));
      };
      img.onerror = rej;
      img.src = r.result;
    };
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

const $ = (s) => document.querySelector(s),
  g = (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch (e) {
      return d;
    }
  },
  sv = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  };
function house3d() {
  return `<div class="house"><i class="hw hf"></i><i class="hw hb"></i><i class="hw hr"></i><i class="hw hl"></i><i class="hw hg"></i><i class="hroof ra"></i><i class="hroof rb"></i><i class="hgab gr"></i><i class="hgab gl"></i></div><div class="hsh"></div>`;
}
const IC = {
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  road: '<path d="M4 20 9 4M20 20 15 4M12 6v3M12 12v3M12 18v2"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  tag: '<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  dollar:
    '<path d="M12 2v20M17 6.5C16 5 14 4.5 12 4.5c-2.5 0-4.5 1.2-4.5 3s1.8 2.6 4.5 3.2 4.5 1.4 4.5 3.3-2 3-4.5 3c-2.2 0-4.2-.7-5-2.2"/>',
  bed: '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/>',
  area: '<path d="M4 4h16v16H4zM4 9h5M4 14h3M9 4v5"/>',
  floor:
    '<path d="M5 21V3h14v18M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M3 21h18"/>',
  phone:
    '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  heart:
    '<path d="M12 21C5 15 3 11.5 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 11.5 19 15 12 21z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
  chat: '<path d="M4 4h16v12H8l-4 4z"/>',
  send: '<path d="M3 12 21 3l-6 18-4-8-8-4z"/>',
  card: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.2"/><path d="M2.5 10h19"/><path d="M6 15h4"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="9.5" rx="2"/><path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5"/>',
};
const ic = (n, f) =>
    `<svg class="i" viewBox="0 0 24 24"${f ? ' style="fill:currentColor"' : ""}>${IC[n]}</svg>`,
  favT = (f) => ic("heart", f) + " " + (f ? t("saved") : t("save"));

/* ---------- 2) Til va tema ------------------------------------------
   Tarjima matnlari shu yerda. Yangi so'z qo'shish uchun uchala tilga
   ham yozing (uz/ru/en), keyin matnda t('kalit') deb chaqiring.
------------------------------------------------------------------- */
const TR = {
  uz: {
    searchPh: "Shahar, tuman, ko'cha yoki uy nomini qidiring...",
    heroTitle: "O'zingizga mos uyni xaritadan toping",
    heroDesc:
      "Xaritadan kerakli hududni tanlang va shu atrofdagi uylarni ko'ring.",
    navHome: "Bosh sahifa",
    navList: "Uylar",
    navMap: "Xarita",
    navSale: "Aksiya",
    navNew: "Yangi uylar",
    navOld: "Eski uylar",
    navVov: "Hovlilar",
    navDescAll: "Barcha uylar",
    navDescMap: "Xaritadagi uylar",
    navDescSale: "Aksiya: chegirmadagi uylar",
    navDescNew: "Yangi uylar",
    navDescOld: "Eski uylar (ikkilamchi)",
    navDescVov: "Vovlilar: hovli uylar",
    sortNew: "Yangi qo'shilganlar",
    sortPa: "Arzonidan qimmatiga",
    sortPd: "Qimmatidan arzoniga",
    sortAr: "Maydoni bo'yicha",
    filterBtn: "Filtrlar",
    filterClear: "Filtrlarni tozalash",
    filterType: "Uy turi",
    filterDist: "Hudud / tuman",
    filterRooms: "Xonalar",
    filterCity: "Shahar: Toshkent",
    priceMin: "Min narx $",
    priceMax: "Maks narx $",
    areaMin: "Min m²",
    areaMax: "Maks m²",
    addProperty: "Uy joylashtirish",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    logout: "Chiqish",
    save: "Saqlash",
    saved: "Saqlangan",
    detBack: "← Orqaga",
    detRooms: "Xonalar",
    detArea: "Maydon",
    detFloor: "Qavat",
    detYear: "Qurilgan yil",
    detType: "Turi",
    detDesc: "Tavsif",
    detMapTitle: "Xarita",
    detContact: "Sotuvchi bilan bog'lanish",
    detPhone: "Telefon:",
    detCall: "Qo'ng'iroq qilish",
    detShare: "Ulashish",
    detNearby: "Shu hududdagi boshqa uylar",
    detTitle: "Batafsil",
    detMapBtn: "Xaritada ko'rish",
    emptyTitle: "Bu hududda uy topilmadi",
    emptyDesc: "Filtrlarni o'zgartiring yoki qidiruv radiusini kengaytiring.",
    expandRadius: "Radiusni 15 km qilish",
    toastFavAdd: "Sevimlilarga qo'shildi",
    toastFavRem: "Sevimlilardan olib tashlandi",
    toastLinkCopied: "Havola nusxalandi",
    toastNoFav: "Hali saqlangan uylar yo'q",
    toastLoginFirst: "Avval tizimga kiring",
    toastListed: "E'lon joylashtirildi!",
    toastWelcome: (n) => `Xush kelibsiz, ${n}!`,
    toastLoggedOut: "Tizimdan chiqdingiz",
    toastDemoLogin: "Demo hisob bilan kirdingiz",
    toastEmailExists: "Bu email allaqachon ro'yxatdan o'tgan",
    toastWrongCred: "Email yoki parol noto'g'ri",
    toastGeoUnsupported: "Brauzer joylashuvni qo'llamaydi",
    toastLocating: "Joylashuv aniqlanmoqda...",
    toastGeoFail: "Joylashuvni aniqlab bo'lmadi. Ruxsatni tekshiring.",
    toastNoResultsNear: "Yaqin atrofda uy topilmadi",
    toastFoundNear: (n, r) => `${n} ta uy topildi (${r} km)`,
    toastAddrNotFound: "Manzil topilmadi. Boshqa nom yozing.",
    toastFilterType: (v) => `Filtr: ${v}`,
    toastMaxPrice: (v) => `Maks narx: ${v}`,
    toastProfileUpdated: "Profil yangilandi",
    searchNoResults: "Hech narsa topilmadi",
    searchDistrictLabel: "Tuman / shahar",
    searchTypeLabel: "Uy turi",
    searchPriceLabel: "Narx bo'yicha qidirish",
    searchPricePrefix: (v) => `Narx: ${v} gacha`,
    myListings: "Mening e'lonlarim",
    savedTitle: "Saqlanganlar",
    emptyList: "Hozircha bo'sh.",
    profBack: "← Orqaga",
    profMemberSince: "A'zo bo'lgan sana",
    profStatListings: "E'lonlar",
    profStatSaved: "Saqlanganlar",
    profStatChats: "Suhbatlar",
    profGoHome: "Bosh sahifa",
    profEdit: "Tahrirlash",
    profEditName: "Ismingiz",
    profEditPhone: "Telefon raqamingiz",
    profEditSave: "Saqlash",
    profEditCancel: "Bekor qilish",
    profPhoneNone: "Telefon kiritilmagan",
    authLoginTitle: "Kirish",
    authRegTitle: "Ro'yxatdan o'tish",
    authLoginSub: "Hisobingizga kiring",
    authRegSub: "Yangi hisob yarating",
    authName: "Ismingiz",
    authEmail: "Email",
    authPass: "Parol",
    authShowPass: "Parolni ko'rsatish",
    authDemo: "Demo hisob bilan kirish",
    authNote: "Demo: ma'lumotlar faqat shu brauzerda saqlanadi.",
    authClose: "✕ Yopish",
    authHeroTitle: "Uyingizni xaritadan toping",
    authHeroDesc:
      "Hisob oching va sevimli uylaringizni saqlang, o'z e'loningizni joylashtiring.",
    authBullet1: "Xaritada uylarni qidirish",
    authBullet2: "Sevimlilarni saqlash",
    authBullet3: "E'lon joylashtirish",
    addFormTitle: "Uy joylashtirish",
    addTitleLbl: "Sarlavha",
    addTypeLbl: "Turi",
    addDistLbl: "Tuman",
    addStreetLbl: "Ko'cha",
    addPriceLbl: "Narx ($)",
    addAreaLbl: "Maydon (m²)",
    addRoomsLbl: "Xonalar",
    addFloorLbl: "Qavat",
    addPhoneLbl: "Telefon",
    addDescLbl: "Tavsif",
    addImagesLbl: "Rasmlar (ixtiyoriy, 6 tagacha)",
    addSubmit: "E'lon berish",
    defaultDesc: "Yangi e'lon.",
    imgTooMany: "Faqat birinchi 6 ta rasm olinadi",
    imgUploading: "Rasmlar yuklanmoqda...",
    roomsWord: "xona",
    floorWord: "qavat",
    unitsSuffix: "ta uy",
    themeLabel: "Tema",
    langLabel: "Til",
    perMonth: "/oy",
    navStudents: "Talabalar",
    navDescStudents: "Talabalar uchun arzon uylar va kvartiralar",
    studentsHeroTitle: "Talabalar uchun arzon uylar",
    studentsHeroDesc:
      "Universitetlarga yaqin, hamyonbop ijaraga beriladigan uylar. Faqat talaba guvohnomasi bilan.",
    studentBadge: "Talaba",
    studentUniLbl: "Universitetga yaqin",
    studentNoteTpl: (u) =>
      `Faqat talabalarga ijaraga beriladi. Talaba guvohnomasi talab qilinadi. ${u ? "Yaqin universitet: " + u + "." : ""}`,
    navDelivery: "Dastavka",
    navDescDelivery: "Ko'chirish uchun arzon yuk mashinalari",
    deliveryHeroTitle: "Ko'chirish uchun dastavka",
    deliveryHeroDesc:
      "UyMap orqali uy xarid qilgan foydalanuvchilarga yuk mashinalarida maxsus chegirma.",
    deliveryBadge: (n) => `UyMap orqali xarid qilganlarga -${n}%`,
    deliveryCapacityLbl: "Yuk ko'tarish sig'imi",
    deliveryPriceLbl: "Shahar bo'ylab narx",
    deliveryOldPriceNote: "Oddiy narx",
    detChat: "Xabar yozish",
    chatWith: (n) => `${n} bilan suhbat`,
    chatPh: "Xabar yozing...",
    chatSend: "Yuborish",
    chatEmpty: "Hali xabar yo'q. Birinchi bo'lib yozing!",
    chatLoginFirst: "Xabar yozish uchun avval tizimga kiring",
    chatSellerIntro:
      "Salom! Qiziqtirgan savolingiz bo'lsa, bemalol yozavering.",
    chatSellerReplies: [
      "Salom! Albatta, savolingizga javob beraman.",
      "Rahmat, xabaringiz uchun! Tez orada aloqaga chiqaman.",
      "Ha, uy hali sotuvda. Qachon ko'rishni xohlaysiz?",
      "Narx bo'yicha kelishib olishimiz mumkin, qo'ng'iroq qiling.",
    ],
    detBuy: "Sotib olish",
    payLoginFirst: "Sotib olish uchun avval tizimga kiring",
    payTitle: "To'lov ma'lumotlari",
    paySubtitle: "Xaridni yakunlash uchun karta ma'lumotlaringizni kiriting",
    payAmountLbl: "To'lov summasi",
    payCardNum: "Karta raqami",
    payCardName: "Karta egasining ismi",
    payCardNamePh: "IMANOV IMON",
    payExpiry: "Amal qilish muddati",
    payCVC: "CVC",
    paySecureNote: "Bu demo to'lov — real pul yechilmaydi.",
    paySubmit: "To'lovni tasdiqlash",
    payProcessing: "To'lov amalga oshirilmoqda...",
    paySuccessTitle: "To'lov muvaffaqiyatli amalga oshirildi!",
    paySuccessDesc: (p) =>
      `"${p}" uchun to'lov qabul qilindi. Sotuvchi tez orada siz bilan bog'lanadi.`,
    payDeliveryHint:
      "Ko'chirish vaqti keldimi? UyMap orqali xarid qilganlar uchun dastavkada chegirma bor.",
    payGoDelivery: "Dastavka bo'limiga o'tish",
    payClose: "Yopish",
    payInvalidCard: "Karta raqamini to'g'ri kiriting (16 ta raqam)",
    payInvalidExpiry: "Amal qilish muddati noto'g'ri yoki muddati tugagan",
    payInvalidCVC: "CVC kodini to'g'ri kiriting (3 raqam)",
    payInvalidName: "Karta egasining ismini kiriting",
    descTpl: (d) =>
      `${d} tumanidagi qulay joylashuv: maktab, bog' va jamoat transporti yaqin. Ta'mir holati yaxshi, hujjatlar tayyor, tez orada ko'rish mumkin.`,
    titleBig: (tp, ar, d) => `${tp} — ${ar} m² yer, ${d}`,
    titleSmall: (rm, tp, d) => `${rm} xonali ${tp.toLowerCase()}, ${d}`,
    navBrokers: "Maklerlar",
    navDescBrokers: "Ishonchli ko'chmas mulk maklerlari",
    brokersHeroTitle: "Maklerlar bilan bog'laning",
    brokersHeroDesc:
      "Tajribali maklerlar sizga uy tanlash va rasmiylashtirishda yordam beradi. Qo'ng'iroq qiling yoki xabar yozing.",
    brokerSpecLbl: "Mutaxassisligi",
    brokerDistLbl: "Hudud",
    brokerDealsLbl: "Yakunlangan bitimlar",
    brokerRatingLbl: "Reyting",
    brokerCallBtn: "Qo'ng'iroq qilish",
    brokerChatBtn: "Xabar yozish",
    brokerExp: (y) => `${y} yillik tajriba`,
    types: {
      Kvartira: "Kvartira",
      Hovli: "Hovli",
      Villa: "Villa",
      "Yangi uy": "Yangi uy",
      "Eski uy": "Eski uy",
    },
  },
  ru: {
    searchPh: "Введите город, район, улицу или название дома...",
    heroTitle: "Найдите подходящий дом на карте",
    heroDesc: "Выберите нужный район на карте и посмотрите дома поблизости.",
    navHome: "Главная",
    navList: "Дома",
    navMap: "Карта",
    navSale: "Акции",
    navNew: "Новостройки",
    navOld: "Вторичное жильё",
    navVov: "С участком",
    navDescAll: "Все дома",
    navDescMap: "Дома на карте",
    navDescSale: "Акции: дома со скидкой",
    navDescNew: "Новостройки",
    navDescOld: "Вторичное жильё",
    navDescVov: "Дома с приусадебным участком",
    sortNew: "Сначала новые",
    sortPa: "Сначала дешевле",
    sortPd: "Сначала дороже",
    sortAr: "По площади",
    filterBtn: "Фильтры",
    filterClear: "Сбросить фильтры",
    filterType: "Тип жилья",
    filterDist: "Район",
    filterRooms: "Комнаты",
    filterCity: "Город: Ташкент",
    priceMin: "Мин. цена $",
    priceMax: "Макс. цена $",
    areaMin: "Мин. м²",
    areaMax: "Макс. м²",
    addProperty: "Разместить объявление",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",
    save: "Сохранить",
    saved: "Сохранено",
    detBack: "← Назад",
    detRooms: "Комнаты",
    detArea: "Площадь",
    detFloor: "Этаж",
    detYear: "Год постройки",
    detType: "Тип",
    detDesc: "Описание",
    detMapTitle: "Карта",
    detContact: "Связаться с продавцом",
    detPhone: "Телефон:",
    detCall: "Позвонить",
    detShare: "Поделиться",
    detNearby: "Другие дома в этом районе",
    detTitle: "Подробнее",
    detMapBtn: "Показать на карте",
    emptyTitle: "Дома в этом районе не найдены",
    emptyDesc: "Измените фильтры или увеличьте радиус поиска.",
    expandRadius: "Увеличить радиус до 15 км",
    toastFavAdd: "Добавлено в избранное",
    toastFavRem: "Удалено из избранного",
    toastLinkCopied: "Ссылка скопирована",
    toastNoFav: "Пока нет сохранённых домов",
    toastLoginFirst: "Сначала войдите в систему",
    toastListed: "Объявление опубликовано!",
    toastWelcome: (n) => `Добро пожаловать, ${n}!`,
    toastLoggedOut: "Вы вышли из системы",
    toastDemoLogin: "Вы вошли в демо-аккаунт",
    toastEmailExists: "Этот email уже зарегистрирован",
    toastWrongCred: "Неверный email или пароль",
    toastGeoUnsupported: "Браузер не поддерживает геолокацию",
    toastLocating: "Определение местоположения...",
    toastGeoFail: "Не удалось определить местоположение. Проверьте разрешения.",
    toastNoResultsNear: "Поблизости дома не найдены",
    toastFoundNear: (n, r) => `Найдено домов: ${n} (${r} км)`,
    toastAddrNotFound: "Адрес не найден. Введите другое название.",
    toastFilterType: (v) => `Фильтр: ${v}`,
    toastMaxPrice: (v) => `Макс. цена: ${v}`,
    toastProfileUpdated: "Профиль обновлён",
    searchNoResults: "Ничего не найдено",
    searchDistrictLabel: "Район / город",
    searchTypeLabel: "Тип жилья",
    searchPriceLabel: "Поиск по цене",
    searchPricePrefix: (v) => `Цена: до ${v}`,
    myListings: "Мои объявления",
    savedTitle: "Сохранённые",
    emptyList: "Пока пусто.",
    profBack: "← Назад",
    profMemberSince: "Дата регистрации",
    profStatListings: "Объявления",
    profStatSaved: "Сохранённые",
    profStatChats: "Чаты",
    profGoHome: "Главная",
    profEdit: "Редактировать",
    profEditName: "Ваше имя",
    profEditPhone: "Ваш телефон",
    profEditSave: "Сохранить",
    profEditCancel: "Отмена",
    profPhoneNone: "Телефон не указан",
    authLoginTitle: "Вход",
    authRegTitle: "Регистрация",
    authLoginSub: "Войдите в свой аккаунт",
    authRegSub: "Создайте новый аккаунт",
    authName: "Ваше имя",
    authEmail: "Email",
    authPass: "Пароль",
    authShowPass: "Показать пароль",
    authDemo: "Войти в демо-аккаунт",
    authNote: "Демо: данные сохраняются только в этом браузере.",
    authClose: "✕ Закрыть",
    authHeroTitle: "Найдите свой дом на карте",
    authHeroDesc:
      "Создайте аккаунт, сохраняйте понравившиеся дома и размещайте свои объявления.",
    authBullet1: "Поиск домов на карте",
    authBullet2: "Сохранение избранного",
    authBullet3: "Размещение объявлений",
    addFormTitle: "Разместить объявление",
    addTitleLbl: "Заголовок",
    addTypeLbl: "Тип",
    addDistLbl: "Район",
    addStreetLbl: "Улица",
    addPriceLbl: "Цена ($)",
    addAreaLbl: "Площадь (м²)",
    addRoomsLbl: "Комнаты",
    addFloorLbl: "Этаж",
    addPhoneLbl: "Телефон",
    addDescLbl: "Описание",
    addImagesLbl: "Фотографии (необязательно, до 6 шт.)",
    addSubmit: "Опубликовать",
    defaultDesc: "Новое объявление.",
    imgTooMany: "Будут использованы только первые 6 фото",
    imgUploading: "Загрузка фото...",
    roomsWord: "комн.",
    floorWord: "этаж",
    unitsSuffix: "домов",
    themeLabel: "Тема",
    langLabel: "Язык",
    perMonth: "/мес.",
    navStudents: "Студентам",
    navDescStudents: "Недорогое жильё для студентов",
    studentsHeroTitle: "Недорогое жильё для студентов",
    studentsHeroDesc:
      "Доступная аренда рядом с университетами. Только по студенческому билету.",
    studentBadge: "Студентам",
    studentUniLbl: "Рядом с университетом",
    studentNoteTpl: (u) =>
      `Сдаётся только студентам. Требуется студенческий билет. ${u ? "Ближайший университет: " + u + "." : ""}`,
    navDelivery: "Доставка",
    navDescDelivery: "Недорогие грузовики для переезда",
    deliveryHeroTitle: "Доставка для переезда",
    deliveryHeroDesc:
      "Специальная скидка на грузовики для тех, кто купил дом через UyMap.",
    deliveryBadge: (n) => `-${n}% для купивших через UyMap`,
    deliveryCapacityLbl: "Грузоподъёмность",
    deliveryPriceLbl: "Цена по городу",
    deliveryOldPriceNote: "Обычная цена",
    detChat: "Написать сообщение",
    chatWith: (n) => `Чат с ${n}`,
    chatPh: "Напишите сообщение...",
    chatSend: "Отправить",
    chatEmpty: "Сообщений пока нет. Напишите первым!",
    chatLoginFirst: "Войдите в систему, чтобы написать сообщение",
    chatSellerIntro: "Здравствуйте! Если есть вопросы, пишите, не стесняйтесь.",
    chatSellerReplies: [
      "Здравствуйте! Конечно, отвечу на ваш вопрос.",
      "Спасибо за сообщение! Скоро свяжусь с вами.",
      "Да, дом ещё продаётся. Когда хотите посмотреть?",
      "По цене можем договориться, позвоните мне.",
    ],
    descTpl: (d) =>
      `Удобное расположение в районе ${d}: рядом школа, парк и общественный транспорт. Хороший ремонт, документы готовы, можно посмотреть в ближайшее время.`,
    titleBig: (tp, ar, d) => `${tp} — ${ar} м² земли, ${d}`,
    titleSmall: (rm, tp, d) => `${rm}-комнатная ${tp.toLowerCase()}, ${d}`,
    navBrokers: "Маклеры",
    navDescBrokers: "Надёжные риелторы по недвижимости",
    brokersHeroTitle: "Свяжитесь с маклером",
    brokersHeroDesc:
      "Опытные маклеры помогут выбрать дом и оформить сделку. Позвоните или напишите сообщение.",
    brokerSpecLbl: "Специализация",
    brokerDistLbl: "Район",
    brokerDealsLbl: "Завершённых сделок",
    brokerRatingLbl: "Рейтинг",
    brokerCallBtn: "Позвонить",
    brokerChatBtn: "Написать сообщение",
    brokerExp: (y) => `Опыт ${y} лет`,
    types: {
      Kvartira: "Квартира",
      Hovli: "Дом с двором",
      Villa: "Вилла",
      "Yangi uy": "Новостройка",
      "Eski uy": "Вторичное жильё",
    },
  },
  en: {
    searchPh: "Search city, district, street or property name...",
    heroTitle: "Find your perfect home on the map",
    heroDesc: "Pick an area on the map and see the homes nearby.",
    navHome: "Home",
    navList: "Listings",
    navMap: "Map",
    navSale: "Deals",
    navNew: "New buildings",
    navOld: "Old houses",
    navVov: "With yard",
    navDescAll: "All properties",
    navDescMap: "Properties on the map",
    navDescSale: "Deals: discounted properties",
    navDescNew: "New buildings",
    navDescOld: "Old houses (secondary market)",
    navDescVov: "Houses with a yard",
    sortNew: "Newest first",
    sortPa: "Price: low to high",
    sortPd: "Price: high to low",
    sortAr: "By area",
    filterBtn: "Filters",
    filterClear: "Clear filters",
    filterType: "Property type",
    filterDist: "District",
    filterRooms: "Rooms",
    filterCity: "City: Tashkent",
    priceMin: "Min price $",
    priceMax: "Max price $",
    areaMin: "Min m²",
    areaMax: "Max m²",
    addProperty: "List a property",
    login: "Log in",
    register: "Sign up",
    logout: "Log out",
    save: "Save",
    saved: "Saved",
    detBack: "← Back",
    detRooms: "Rooms",
    detArea: "Area",
    detFloor: "Floor",
    detYear: "Built",
    detType: "Type",
    detDesc: "Description",
    detMapTitle: "Map",
    detContact: "Contact seller",
    detPhone: "Phone:",
    detCall: "Call",
    detShare: "Share",
    detNearby: "Other properties nearby",
    detTitle: "Details",
    detMapBtn: "Show on map",
    emptyTitle: "No properties found here",
    emptyDesc: "Try adjusting the filters or expanding the search radius.",
    expandRadius: "Expand radius to 15 km",
    toastFavAdd: "Added to favorites",
    toastFavRem: "Removed from favorites",
    toastLinkCopied: "Link copied",
    toastNoFav: "No saved properties yet",
    toastLoginFirst: "Please log in first",
    toastListed: "Listing published!",
    toastWelcome: (n) => `Welcome, ${n}!`,
    toastLoggedOut: "You have logged out",
    toastDemoLogin: "Logged in with demo account",
    toastEmailExists: "This email is already registered",
    toastWrongCred: "Incorrect email or password",
    toastGeoUnsupported: "Browser doesn't support geolocation",
    toastLocating: "Locating...",
    toastGeoFail: "Couldn't get your location. Check permissions.",
    toastNoResultsNear: "No properties found nearby",
    toastFoundNear: (n, r) => `Found ${n} properties (${r} km)`,
    toastAddrNotFound: "Address not found. Try another name.",
    toastFilterType: (v) => `Filter: ${v}`,
    toastMaxPrice: (v) => `Max price: ${v}`,
    toastProfileUpdated: "Profile updated",
    searchNoResults: "Nothing found",
    searchDistrictLabel: "District / city",
    searchTypeLabel: "Property type",
    searchPriceLabel: "Search by price",
    searchPricePrefix: (v) => `Price: up to ${v}`,
    myListings: "My listings",
    savedTitle: "Saved",
    emptyList: "Nothing here yet.",
    profBack: "← Back",
    profMemberSince: "Member since",
    profStatListings: "Listings",
    profStatSaved: "Saved",
    profStatChats: "Chats",
    profGoHome: "Home",
    profEdit: "Edit",
    profEditName: "Your name",
    profEditPhone: "Your phone",
    profEditSave: "Save",
    profEditCancel: "Cancel",
    profPhoneNone: "No phone added",
    authLoginTitle: "Log in",
    authRegTitle: "Sign up",
    authLoginSub: "Sign in to your account",
    authRegSub: "Create a new account",
    authName: "Your name",
    authEmail: "Email",
    authPass: "Password",
    authShowPass: "Show password",
    authDemo: "Log in with demo account",
    authNote: "Demo: data is stored only in this browser.",
    authClose: "✕ Close",
    authHeroTitle: "Find your home on the map",
    authHeroDesc:
      "Create an account to save favorite homes and publish your own listing.",
    authBullet1: "Search homes on the map",
    authBullet2: "Save favorites",
    authBullet3: "Publish a listing",
    addFormTitle: "List a property",
    addTitleLbl: "Title",
    addTypeLbl: "Type",
    addDistLbl: "District",
    addStreetLbl: "Street",
    addPriceLbl: "Price ($)",
    addAreaLbl: "Area (m²)",
    addRoomsLbl: "Rooms",
    addFloorLbl: "Floor",
    addPhoneLbl: "Phone",
    addDescLbl: "Description",
    addImagesLbl: "Photos (optional, up to 6)",
    addSubmit: "Submit listing",
    defaultDesc: "New listing.",
    imgTooMany: "Only the first 6 photos will be used",
    imgUploading: "Uploading photos...",
    roomsWord: "rooms",
    floorWord: "floor",
    unitsSuffix: "properties",
    themeLabel: "Theme",
    langLabel: "Language",
    perMonth: "/mo",
    navStudents: "Students",
    navDescStudents: "Affordable housing for students",
    studentsHeroTitle: "Affordable housing for students",
    studentsHeroDesc:
      "Budget-friendly rentals close to universities. Student ID required.",
    studentBadge: "Student",
    studentUniLbl: "Near university",
    studentNoteTpl: (u) =>
      `Rented to students only. Student ID required. ${u ? "Nearest university: " + u + "." : ""}`,
    navDelivery: "Delivery",
    navDescDelivery: "Discounted moving trucks",
    deliveryHeroTitle: "Moving delivery",
    deliveryHeroDesc:
      "Special discount on moving trucks for users who bought a home through UyMap.",
    deliveryBadge: (n) => `-${n}% for UyMap buyers`,
    deliveryCapacityLbl: "Load capacity",
    deliveryPriceLbl: "Citywide price",
    deliveryOldPriceNote: "Regular price",
    detChat: "Message",
    chatWith: (n) => `Chat with ${n}`,
    chatPh: "Type a message...",
    chatSend: "Send",
    chatEmpty: "No messages yet. Say hello!",
    chatLoginFirst: "Please log in to send a message",
    chatSellerIntro: "Hi! Feel free to ask anything about this property.",
    chatSellerReplies: [
      "Hi! Sure, happy to answer your question.",
      "Thanks for your message! I'll get back to you soon.",
      "Yes, it's still available. When would you like to see it?",
      "We can discuss the price, feel free to call me.",
    ],
    descTpl: (d) =>
      `Convenient location in ${d}: close to schools, parks and public transport. Good condition, documents ready, viewing available soon.`,
    titleBig: (tp, ar, d) => `${tp} — ${ar} m² of land, ${d}`,
    titleSmall: (rm, tp, d) => `${rm}-room ${tp.toLowerCase()}, ${d}`,
    navBrokers: "Brokers",
    navDescBrokers: "Trusted real estate brokers",
    brokersHeroTitle: "Connect with a broker",
    brokersHeroDesc:
      "Experienced brokers can help you choose a home and handle the paperwork. Call or send a message.",
    brokerSpecLbl: "Specializes in",
    brokerDistLbl: "District",
    brokerDealsLbl: "Deals closed",
    brokerRatingLbl: "Rating",
    brokerCallBtn: "Call",
    brokerChatBtn: "Message",
    brokerExp: (y) => `${y} years experience`,
    types: {
      Kvartira: "Apartment",
      Hovli: "House with yard",
      Villa: "Villa",
      "Yangi uy": "New building",
      "Eski uy": "Old house",
    },
  },
};
let LANG = g("uymap_lang", "uz");
if (!TR[LANG]) LANG = "uz";
const t = (k) => TR[LANG][k];
const typeLabel = (tp) => TR[LANG].types[tp] || tp;
function setLang(l) {
  LANG = l;
  sv("uymap_lang", l);
  document.documentElement.lang = l;
  applyLang();
}
let THEME = g("uymap_theme", null);
function applyTheme() {
  if (THEME) document.documentElement.setAttribute("data-theme", THEME);
  else document.documentElement.removeAttribute("data-theme");
  const b = $("#tt");
  if (b) b.innerHTML = ic(THEME == "dark" ? "sun" : "moon");
}
function toggleTheme() {
  const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const curDark = THEME ? THEME == "dark" : sysDark;
  THEME = curDark ? "light" : "dark";
  sv("uymap_theme", THEME);
  applyTheme();
}

/* ---------- 3) Ma'lumotlar ---------- */
const D = [
  [
    "Tashkent",
    41.3111,
    69.2797,
    ["Amir Temur xiyoboni", "Navoiy ko'chasi", "Shota Rustaveli ko'chasi"],
  ],
  [
    "Chilonzor",
    41.2755,
    69.2035,
    ["Bunyodkor shoh ko'chasi", "Qatortol ko'chasi", "Muqimiy ko'chasi"],
  ],
  [
    "Yunusobod",
    41.365,
    69.2875,
    ["Ahmad Donish ko'chasi", "Yunusobod 4-kvartal", "Shahrisabz ko'chasi"],
  ],
  [
    "Mirzo Ulug'bek",
    41.34,
    69.32,
    ["Mirzo Ulug'bek ko'chasi", "Buyuk Ipak Yo'li", "Ziyolilar ko'chasi"],
  ],
  [
    "Sergeli",
    41.223,
    69.22,
    ["Sergeli 7-mavze", "Yangi Sergeli ko'chasi", "Qo'yliq ko'chasi"],
  ],
  [
    "Yashnobod",
    41.295,
    69.335,
    ["Yashnobod ko'chasi", "Parkent ko'chasi", "Oybek ko'chasi"],
  ],
  [
    "Shayxontohur",
    41.326,
    69.235,
    ["Shayxontohur ko'chasi", "Zarqaynar ko'chasi", "Labzak ko'chasi"],
  ],
  [
    "Olmazor",
    41.345,
    69.215,
    ["Olmazor ko'chasi", "Universitet ko'chasi", "Yozuvchilar ko'chasi"],
  ],
];
const T = ["Kvartira", "Hovli", "Villa", "Yangi uy", "Eski uy"];
let s = 11;
const R = () => (s = (s * 16807) % 2147483647) / 2147483647;
const base = [];
for (let i = 0; i < 32; i++) {
  const d = D[i % 8],
    t2 = T[i % 5],
    big = t2 == "Hovli" || t2 == "Villa",
    rooms = big ? 4 + (i % 3) : 1 + (i % 4),
    area = big
      ? Math.round(180 + R() * 420)
      : Math.round(rooms * 20 + 22 + R() * 25),
    price =
      Math.round((area * (big ? 350 + R() * 300 : 800 + R() * 700)) / 500) *
      500,
    st = d[3][i % 3];
  base.push({
    id: "p" + (i + 1),
    price,
    old: i % 4 == 0 ? Math.round((price * 1.15) / 500) * 500 : 0,
    lat: d[1] + (R() - 0.5) * 0.03,
    lng: d[2] + (R() - 0.5) * 0.04,
    rooms,
    area,
    type: t2,
    cat:
      t2 == "Yangi uy"
        ? "new"
        : t2 == "Eski uy"
          ? "old"
          : big
            ? "vov"
            : i % 2
              ? "new"
              : "old",
    dist: d[0],
    st,
    addr: `${st}, ${d[0]}, ${10 + i * 3}-uy`,
    floor: big ? 1 : 1 + (i % 9),
    fl2: big ? 2 : 9 + (i % 4),
    year:
      t2 == "Eski uy"
        ? 1970 + (i % 25)
        : t2 == "Yangi uy"
          ? 2023 + (i % 4)
          : 2000 + (i % 22),
    sale: i % 4 == 0,
    date: Date.now() - i * 864e5,
    phone: "+998 90 123 45 " + (10 + i),
    big,
  });
}
const UNIS = [
  "TATU",
  "TDIU",
  "Milliy universitet (O'zMU)",
  "TDYU",
  "Toshkent tibbiyot akademiyasi",
  "Xalqaro Vestminster universiteti",
  "INHA universiteti",
  "TDTU",
];
const STUD = [
  [0, 1, 55, 14, "p201"],
  [1, 1, 70, 16, "p202"],
  [2, 1, 65, 15, "p203"],
  [3, 2, 95, 22, "p204"],
  [4, 1, 60, 15, "p205"],
  [5, 1, 75, 17, "p206"],
  [6, 2, 100, 24, "p207"],
  [7, 1, 68, 16, "p208"],
].map((a, i) => {
  const [di, rooms, price, area, id] = a,
    d = D[di],
    st = d[3][i % 3],
    uni = UNIS[i];
  return {
    id,
    price,
    old: 0,
    lat: d[1] + (R() - 0.5) * 0.02,
    lng: d[2] + (R() - 0.5) * 0.025,
    rooms,
    area,
    type: "Kvartira",
    cat: "student",
    dist: d[0],
    st,
    addr: `${st}, ${d[0]}`,
    floor: 1 + (i % 5),
    fl2: 5 + (i % 4),
    year: 2015 + (i % 10),
    sale: false,
    date: Date.now() - i * 432e5,
    phone: "+998 93 345 67 " + (10 + i),
    uni,
    big: false,
  };
});
let UP = g("uymap_props", []),
  P = [...base, ...STUD, ...UP];
const pTitle = (p) =>
  p.title ||
  (p.big
    ? t("titleBig")(typeLabel(p.type), p.area, p.dist)
    : t("titleSmall")(p.rooms, typeLabel(p.type), p.dist));
const pDesc = (p) => p.desc || t("descTpl")(p.dist);
const im = (p, k = 0) => {
  const U = p.images;
  if (U && U.length) return U[k % U.length];
  const L = RASMLAR[p.id];
  if (L && L.length) return L[k % L.length];
  const h = (parseInt(p.id.slice(1)) * 47 + k * 40) % 360;
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 260'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},60%,68%)'/><stop offset='1' stop-color='hsl(${(h + 50) % 360},55%,38%)'/></linearGradient></defs><rect width='400' height='260' fill='url(#g)'/><path d='M120 170v-60l80-50 80 50v60z' fill='rgba(255,255,255,.9)'/><rect x='185' y='125' width='30' height='45' fill='hsl(${h},50%,35%)'/><text x='200' y='215' text-anchor='middle' font-size='22' font-family='sans-serif' fill='white'>${p.type}</text></svg>`,
    )
  );
};
const $$ = (n) => "$" + n.toLocaleString("en").replace(/,/g, " "),
  sh = (n) => "$" + (n >= 1e3 ? Math.round(n / 1e3) + "k" : n);
const NV = [
  ["home", "all"],
  ["list", "all"],
  ["map", "all"],
  ["map", "sale"],
  ["map", "new"],
  ["map", "old"],
  ["map", "vov"],
  ["map", "student"],
  ["brokers", "all"],
  ["delivery", "all"],
];
const PAGE_RENDER = {
  brokers: () => renderBrokers(),
  delivery: () => renderDelivery(),
};
const BK_NAMES = [
  "Alisher Qodirov",
  "Dilnoza Yusupova",
  "Sardor Rashidov",
  "Gulnora Tosheva",
  "Jasur Nematov",
  "Zarina Yoqubova",
  "Botir Saidov",
  "Malika Nurova",
];
const BROKERS = BK_NAMES.map((name, i) => {
  const specs = [T[i % 5], T[(i + 2) % 5]],
    dists = [D[i % 8][0], D[(i + 3) % 8][0]];
  return {
    id: "b" + (i + 1),
    name,
    phone: "+998 91 234 56 " + (20 + i),
    specs,
    dists,
    rating: (4.3 + ((i * 37) % 7) / 10).toFixed(1),
    deals: 30 + ((i * 53) % 90),
    exp: 3 + (i % 9),
  };
});
function brokerAvatar(b) {
  const h = (parseInt(b.id.slice(1)) * 67 + 40) % 360,
    init = b.name
      .split(" ")
      .map((w) => w[0])
      .join("");
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},60%,62%)'/><stop offset='1' stop-color='hsl(${(h + 45) % 360},55%,40%)'/></linearGradient></defs><rect width='200' height='200' fill='url(#g)'/><text x='100' y='118' text-anchor='middle' font-size='72' font-weight='700' font-family='Manrope,sans-serif' fill='white'>${init}</text></svg>`,
    )
  );
}
function brokerCard(b) {
  return `<div class="bkc"><img class="bka" src="${brokerAvatar(b)}" alt=""><div class="bkb"><b>${b.name}</b><div class="mu">${ic("tag")} ${t("brokerSpecLbl")}: ${b.specs.map(typeLabel).join(", ")}</div><div class="mu">${ic("pin")} ${t("brokerDistLbl")}: ${b.dists.join(", ")}</div><div class="mu">★ ${b.rating} · ${t("brokerDealsLbl")}: ${b.deals} · ${t("brokerExp")(b.exp)}</div><div class="ac"><a class="b p" style="text-decoration:none;text-align:center" href="tel:${b.phone.replace(/\s/g, "")}">${ic("phone")} ${t("brokerCallBtn")}</a><button class="b" data-a="bchat" data-id="${b.id}">${ic("chat")} ${t("brokerChatBtn")}</button></div></div></div>`;
}
function renderBrokers() {
  $("#cnt").textContent = `${navDesc(S.nav)} · ${BROKERS.length}`;
  $("#qc").innerHTML = "";
  $("#cards").innerHTML = BROKERS.map(brokerCard).join("");
}
function openNamedChat(cid, name) {
  if (!S.me) {
    toast(t("chatLoginFirst"));
    return authM(false);
  }
  let L = chatMsgs(cid);
  if (!L.length) {
    L = [{ from: "seller", text: t("chatSellerIntro") }];
    chatSave(cid, L);
  }
  modal(
    `<div class="row" style="margin-bottom:8px"><b>${t("chatWith")(name)}</b><button class="b" data-a="cclose" style="margin-left:auto">✕</button></div><div id="cmlist" class="cmlist"></div><form id="cform" class="row" style="gap:6px;margin-top:10px"><input id="cmsg" autocomplete="off" placeholder="${t("chatPh")}" style="flex:1;padding:10px 13px;border-radius:12px;border:1px solid var(--bd);background:var(--cd);color:var(--tx);font:inherit;font-size:14px"><button class="b p" style="padding:0 14px" aria-label="${t("chatSend")}">${ic("send")}</button></form>`,
  );
  $("#md")._pid = cid;
  chatRenderList(cid);
  $("#cform").onsubmit = (e) => {
    e.preventDefault();
    const inp = $("#cmsg"),
      v = inp.value.trim();
    if (!v) return;
    const L2 = chatMsgs(cid);
    L2.push({ from: "me", text: v });
    chatSave(cid, L2);
    inp.value = "";
    chatRenderList(cid);
    setTimeout(
      () => {
        const L3 = chatMsgs(cid);
        L3.push({
          from: "seller",
          text: t("chatSellerReplies")[
            Math.floor(Math.random() * t("chatSellerReplies").length)
          ],
        });
        chatSave(cid, L3);
        if ($("#md").classList.contains("o") && $("#md")._pid == cid)
          chatRenderList(cid);
      },
      900 + Math.random() * 900,
    );
  };
}
function openBrokerChat(bid) {
  const b = BROKERS.find((x) => x.id == bid);
  if (!b) return;
  openNamedChat(bid, b.name);
}
const DELIVERY = [
  ["KamAZ bortli yuk mashinasi", "5 t", 180000, 20],
  ["Isuzu yopiq furgon", "3 t", 140000, 18],
  ["Labo kichik furgon", "1.5 t", 90000, 15],
  ["Gazel Next", "1 t", 70000, 15],
  ["KamAZ konteyner tashuvchi", "8 t", 260000, 22],
  ["Mercedes Sprinter", "2 t", 110000, 18],
].map((a, i) => {
  const [name, cap, base, disc] = a;
  return {
    id: "t" + (i + 1),
    name,
    cap,
    base,
    disc,
    price: Math.round((base * (1 - disc / 100)) / 1000) * 1000,
    phone: "+998 94 456 78 " + (10 + i),
    rating: (4.4 + ((i * 29) % 6) / 10).toFixed(1),
  };
});
function deliveryAvatar(d) {
  const h = (parseInt(d.id.slice(1)) * 83 + 200) % 360;
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},55%,60%)'/><stop offset='1' stop-color='hsl(${(h + 40) % 360},55%,38%)'/></linearGradient></defs><rect width='200' height='200' fill='url(#g)'/><g transform='translate(38,70)' fill='white'><rect x='0' y='0' width='70' height='40' rx='4'/><path d='M70 10h26l20 20v10h-46z'/><circle cx='28' cy='58' r='12' fill='#1f2937'/><circle cx='104' cy='58' r='12' fill='#1f2937'/></g></svg>`,
    )
  );
}
function deliveryCard(d) {
  return `<div class="bkc"><img class="bka" style="border-radius:12px" src="${deliveryAvatar(d)}" alt=""><div class="bkb"><b>${d.name}</b><div class="mu">${t("deliveryCapacityLbl")}: ${d.cap}</div><div class="mu">${t("deliveryPriceLbl")}: ${$$(d.price)} <s style="color:var(--mu)">${$$(d.base)}</s> <span style="color:var(--ac);font-weight:700">${t("deliveryBadge")(d.disc)}</span></div><div class="mu">★ ${d.rating}</div><div class="ac"><a class="b p" style="text-decoration:none;text-align:center" href="tel:${d.phone.replace(/\s/g, "")}">${ic("phone")} ${t("brokerCallBtn")}</a><button class="b" data-a="dchat" data-id="${d.id}">${ic("chat")} ${t("brokerChatBtn")}</button></div></div></div>`;
}
function renderDelivery() {
  $("#cnt").textContent = `${navDesc(S.nav)} · ${DELIVERY.length}`;
  $("#qc").innerHTML = "";
  $("#cards").innerHTML = DELIVERY.map(deliveryCard).join("");
}
function openDeliveryChat(did) {
  const d = DELIVERY.find((x) => x.id == did);
  if (!d) return;
  openNamedChat(did, d.name);
}
const S = {
  nav: 0,
  cat: "all",
  q: null,
  rad: 5,
  sel: null,
  fav: g("uymap_fav", []),
  favOnly: false,
  f: {},
  sort: "new",
  me: g("uymap_me", null),
};
function toast(t) {
  const e = $("#ts");
  e.textContent = t;
  e.classList.add("s");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => e.classList.remove("s"), 2400);
}
/* ---------- 4) Xarita ---------- */
const M = { lat: 41.3111, lng: 69.2797, z: 11.8 };
let W = 800,
  H = 600;
const cv = $("#cv"),
  cx = cv.getContext("2d");
const pr = (la, ln, z) => {
  const s = 256 * 2 ** z,
    n = Math.sin((la * Math.PI) / 180);
  return [
    ((ln + 180) / 360) * s,
    (0.5 - Math.log((1 + n) / (1 - n)) / (4 * Math.PI)) * s,
  ];
};
const un = (x, y, z) => {
  const s = 256 * 2 ** z;
  return [
    (180 / Math.PI) * Math.atan(Math.sinh(Math.PI - (2 * Math.PI * y) / s)),
    (x / s) * 360 - 180,
  ];
};
const sc = (la, ln) => {
  const [x, y] = pr(la, ln, M.z),
    [a, b] = pr(M.lat, M.lng, M.z);
  return [W / 2 + x - a, H / 2 + y - b];
};
const mpp = (la, z) => (156543 * Math.cos((la * Math.PI) / 180)) / 2 ** z;
const hav = (a, b, c, d) => {
  const r = Math.PI / 180,
    x =
      Math.sin(((c - a) * r) / 2) ** 2 +
      Math.cos(a * r) * Math.cos(c * r) * Math.sin(((d - b) * r) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(x));
};
function bg(x, w, h, lat, lng, z) {
  const [a, b] = pr(lat, lng, z),
    f = (la, ln) => {
      const [p, q] = pr(la, ln, z);
      return [w / 2 + p - a, h / 2 + q - b];
    };
  const dark = THEME
    ? THEME == "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  x.fillStyle = dark ? "#13211f" : "#eef5f2";
  x.fillRect(0, 0, w, h);
  const t = un(a - w / 2, b - h / 2, z),
    o = un(a + w / 2, b + h / 2, z),
    st = z > 13 ? 0.005 : z > 11.5 ? 0.01 : 0.05;
  x.lineWidth = 1;
  x.strokeStyle = dark ? "#1d2f2c" : "#d7e6e2";
  x.beginPath();
  for (let la = Math.floor(o[0] / st) * st; la <= t[0]; la += st) {
    const y = f(la, 0)[1];
    x.moveTo(0, y);
    x.lineTo(w, y);
  }
  for (let ln = Math.floor(t[1] / st) * st; ln <= o[1]; ln += st) {
    const p = f(0, ln)[0];
    x.moveTo(p, 0);
    x.lineTo(p, h);
  }
  x.stroke();
  x.strokeStyle = dark ? "#1a3d3a" : "#bfe6df";
  x.lineWidth = z * 1.1;
  x.lineCap = "round";
  x.beginPath();
  [
    [41.4, 69.12],
    [41.36, 69.17],
    [41.33, 69.22],
    [41.29, 69.28],
    [41.25, 69.33],
    [41.2, 69.38],
  ].forEach((p, i) => {
    const q = f(p[0], p[1]);
    i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1]);
  });
  x.stroke();
  x.strokeStyle = dark ? "#0d1a18" : "#fff";
  x.lineWidth = Math.max(2, z - 8.5);
  x.beginPath();
  const c = f(D[0][1], D[0][2]);
  D.slice(1).forEach((d) => {
    const q = f(d[1], d[2]);
    x.moveTo(c[0], c[1]);
    x.lineTo(q[0], q[1]);
  });
  x.stroke();
  D.forEach((d) => {
    const q = f(d[1], d[2]),
      r = 2200 / mpp(d[1], z);
    x.beginPath();
    x.arc(q[0], q[1], r, 0, 7);
    x.fillStyle = dark ? "rgba(34,179,159,.18)" : "rgba(15,122,108,.12)";
    x.fill();
    if (z > 10.5) {
      x.fillStyle = dark ? "#8fd9c9" : "#3f6b63";
      x.font = "700 12px Manrope,sans-serif";
      x.textAlign = "center";
      x.fillText(d[0], q[0], q[1] + 4);
    }
  });
}
function resize() {
  const m = $("#mapw");
  W = m.clientWidth || W;
  H = m.clientHeight || H;
  const r = devicePixelRatio || 1;
  cv.width = W * r;
  cv.height = H * r;
  cx.setTransform(r, 0, 0, r, 0, 0);
  render();
}
new ResizeObserver(resize).observe($("#mapw"));
function bounds() {
  const [a, b] = pr(M.lat, M.lng, M.z),
    t = un(a - W / 2, b - H / 2, M.z),
    o = un(a + W / 2, b + H / 2, M.z);
  return { n: t[0], w: t[1], s: o[0], e: o[1] };
}
function draw() {
  bg(cx, W, H, M.lat, M.lng, M.z);
  const q = $("#qp");
  if (S.q) {
    const p = sc(S.q.lat, S.q.lng),
      r = (S.rad * 1000) / mpp(S.q.lat, M.z);
    cx.beginPath();
    cx.arc(p[0], p[1], r, 0, 7);
    cx.fillStyle = "rgba(15,122,108,.10)";
    cx.fill();
    cx.strokeStyle = "#0f7a6c";
    cx.lineWidth = 2;
    cx.setLineDash([7, 6]);
    cx.stroke();
    cx.setLineDash([]);
    q.style.display = "";
    q.style.transform = `translate(${p[0]}px,${p[1]}px)`;
  } else q.style.display = "none";
}
const mks = new Map();
function markers() {
  const L = fl(),
    cl = M.z < 12.6,
    lay = $("#mk"),
    cll = $("#cl");
  lay.style.display = cl ? "none" : "";
  cll.innerHTML = "";
  if (cl) {
    const gr = {};
    L.forEach((p) => {
      const [x, y] = sc(p.lat, p.lng),
        k = Math.floor(x / 70) + "_" + Math.floor(y / 70),
        o = gr[k] || (gr[k] = { n: 0, la: 0, ln: 0 });
      o.n++;
      o.la += p.lat;
      o.ln += p.lng;
    });
    Object.values(gr).forEach((o) => {
      const la = o.la / o.n,
        ln = o.ln / o.n,
        [x, y] = sc(la, ln),
        e = document.createElement("div");
      e.className = "cl";
      e.textContent = o.n;
      e.style.transform = `translate(${x}px,${y}px)`;
      e.onclick = () => fly(la, ln, M.z + 1.6);
      cll.appendChild(e);
    });
    return;
  }
  const ids = new Set(L.map((p) => p.id));
  mks.forEach((e, id) => {
    if (!ids.has(id)) {
      e.remove();
      mks.delete(id);
    }
  });
  L.forEach((p) => {
    let e = mks.get(p.id);
    if (!e) {
      e = document.createElement("div");
      e.className = "mk mk-" + (p.sale ? "sale" : p.cat);
      e.textContent = sh(p.price);
      e.onclick = () => pick(p.id);
      lay.appendChild(e);
      mks.set(p.id, e);
    }
    const [x, y] = sc(p.lat, p.lng);
    e.style.transform = `translate(${x}px,${y}px) translate(-50%,-100%) translateY(${-(typeof bho == "function" ? bho(p) : 0)}px)`;
    e.classList.toggle("on", p.id == S.sel);
  });
}
/* sudrash paytida har kadrda bir marta chizish */
let rqf = 0;
function schedRender() {
  if (!rqf)
    rqf = requestAnimationFrame(() => {
      rqf = 0;
      render();
    });
}
let lt;
function render() {
  draw();
  markers();
  clearTimeout(lt);
  lt = setTimeout(list, 120);
}
let an = 0;
function fly(la, ln, z, ms = 550) {
  cancelAnimationFrame(an);
  const a = [M.lat, M.lng, M.z],
    t0 = performance.now(),
    z2 = Math.max(10, Math.min(17, z));
  const st = (t) => {
    let k = Math.min(1, (t - t0) / ms);
    k = 1 - (1 - k) ** 3;
    M.lat = a[0] + (la - a[0]) * k;
    M.lng = a[1] + (ln - a[1]) * k;
    M.z = a[2] + (z2 - a[2]) * k;
    render();
    if (k < 1) an = requestAnimationFrame(st);
  };
  an = requestAnimationFrame(st);
}
function zoomAt(px, py, dz) {
  const [a, b] = pr(M.lat, M.lng, M.z),
    [la, ln] = un(a + px - W / 2, b + py - H / 2, M.z);
  M.z = Math.max(10, Math.min(17, M.z + dz));
  const [x, y] = pr(la, ln, M.z);
  [M.lat, M.lng] = un(x - (px - W / 2), y - (py - H / 2), M.z);
  render();
}
const mw = $("#mapw");
let dr = null;
mw.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".mk,.cl,.ctl,#mini")) return;
  cancelAnimationFrame(an);
  dr = [e.clientX, e.clientY];
  mw.setPointerCapture(e.pointerId);
  mw.style.cursor = "grabbing";
});
mw.addEventListener("pointermove", (e) => {
  if (!dr) return;
  const dx = e.clientX - dr[0],
    dy = e.clientY - dr[1];
  dr = [e.clientX, e.clientY];
  const [a, b] = pr(M.lat, M.lng, M.z);
  [M.lat, M.lng] = un(a - dx, b - dy, M.z);
  schedRender();
});
mw.addEventListener("pointerup", () => {
  dr = null;
  mw.style.cursor = "";
});
mw.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const r = mw.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 0.5 : -0.5);
  },
  { passive: false },
);
mw.addEventListener("dblclick", (e) => {
  if (e.target.closest(".mk,.cl,.ctl,#mini")) return;
  const r = mw.getBoundingClientRect();
  zoomAt(e.clientX - r.left, e.clientY - r.top, 1);
});
$("#zi").onclick = () => zoomAt(W / 2, H / 2, 1);
$("#zo").onclick = () => zoomAt(W / 2, H / 2, -1);
$("#lc").onclick = () => {
  if (!navigator.geolocation) return toast(t("toastGeoUnsupported"));
  toast(t("toastLocating"));
  navigator.geolocation.getCurrentPosition(
    (p) => {
      setQ({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
        name:
          t("detBack") === "← Back"
            ? "My location"
            : t("detBack") === "← Назад"
              ? "Моё местоположение"
              : "Mening joylashuvim",
      });
    },
    () => toast(t("toastGeoFail")),
    { timeout: 8000 },
  );
};
function fit(L) {
  if (!L.length) return;
  const la = L.map((p) => p.lat),
    ln = L.map((p) => p.lng),
    cla = (Math.min(...la) + Math.max(...la)) / 2,
    cln = (Math.min(...ln) + Math.max(...ln)) / 2;
  let z = 15;
  for (; z > 10; z -= 0.5) {
    const [a, b] = pr(cla, cln, z),
      p1 = pr(Math.max(...la), Math.min(...ln), z),
      p2 = pr(Math.min(...la), Math.max(...ln), z);
    if (Math.abs(p2[0] - p1[0]) < W - 140 && Math.abs(p2[1] - p1[1]) < H - 200)
      break;
  }
  fly(cla, cln, z);
}
/* ---------- 5) Ro'yxat va filtrlar ---------- */
function fl() {
  const f = S.f;
  return P.filter(
    (p) =>
      (S.cat == "all" || (S.cat == "sale" ? p.sale : p.cat == S.cat)) &&
      (!f.type || p.type == f.type) &&
      (!f.dist || p.dist == f.dist) &&
      (!f.rooms || (f.rooms == 5 ? p.rooms >= 5 : p.rooms == f.rooms)) &&
      (!f.min || p.price >= f.min) &&
      (!f.max || p.price <= f.max) &&
      (!f.amin || p.area >= f.amin) &&
      (!f.amax || p.area <= f.amax) &&
      (!S.favOnly || S.fav.includes(p.id)),
  );
}
function vis() {
  let L = fl();
  if (S.q) {
    L = L.map((p) => ({
      ...p,
      km: hav(S.q.lat, S.q.lng, p.lat, p.lng),
    })).filter((p) => p.km <= S.rad);
  } else if (!document.body.classList.contains("v-list")) {
    const b = bounds();
    L = L.filter(
      (p) => p.lat <= b.n && p.lat >= b.s && p.lng >= b.w && p.lng <= b.e,
    );
  }
  const o = {
    pa: (a, b) => a.price - b.price,
    pd: (a, b) => b.price - a.price,
    ar: (a, b) => b.area - a.area,
    new: (a, b) => b.date - a.date,
  }[S.sort];
  return L.sort(S.q && S.sort == "new" ? (a, b) => a.km - b.km : o);
}
function card(p) {
  const fv = S.fav.includes(p.id),
    stu = p.cat == "student";
  return `<div class="c c-${p.sale ? "sale" : p.cat} ${p.id == S.sel ? "sel" : ""}" data-a="det" data-id="${p.id}"><div class="im"><img loading="lazy" alt="${pTitle(p)}" src="${im(p)}">${p.sale ? `<span class="tag">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : ""}${stu ? `<span class="tag stu">${t("studentBadge")}</span>` : ""}</div><div class="cb"><div class="pr">${$$(p.price)}${p.old ? `<s>${$$(p.old)}</s>` : ""}${stu ? ` <span style="font-size:11px;font-weight:600;color:var(--mu)">${t("perMonth")}</span>` : ""}</div><b style="font-size:14px">${pTitle(p)}</b><div class="mu">${ic("pin")} ${p.addr}${p.km != null ? ` · ${p.km.toFixed(1)} km` : ""}</div><div class="mu">${ic("bed")} ${p.rooms} ${t("roomsWord")} · ${ic("area")} ${p.area} m² · ${ic("floor")} ${p.floor}/${p.fl2} ${t("floorWord")} · ${typeLabel(p.type)}</div>${stu ? `<div class="mu">${ic("tag")} ${t("studentUniLbl")}: ${p.uni}</div>` : ""}<div class="ac"><button class="b p" data-a="det" data-id="${p.id}">${t("detTitle")}</button><button class="b" data-a="fav" data-id="${p.id}">${favT(fv)}</button><button class="b" data-a="map" data-id="${p.id}">${t("detMapBtn")}</button></div></div></div>`;
}
function navLabel(i) {
  return [
    t("navHome"),
    t("navList"),
    t("navMap"),
    t("navSale"),
    t("navNew"),
    t("navOld"),
    t("navVov"),
    t("navStudents"),
    t("navBrokers"),
    t("navDelivery"),
  ][i];
}
function navDesc(i) {
  return [
    t("navDescAll"),
    t("navDescAll"),
    t("navDescMap"),
    t("navDescSale"),
    t("navDescNew"),
    t("navDescOld"),
    t("navDescVov"),
    t("navDescStudents"),
    t("navDescBrokers"),
    t("navDescDelivery"),
  ][i];
}
function list() {
  const pr = PAGE_RENDER[NV[S.nav][0]];
  if (pr) return pr();
  const L = vis();
  $("#cnt").textContent = `${navDesc(S.nav)} · ${L.length} ${t("unitsSuffix")}`;
  $("#lh").textContent =
    (document.querySelector("#list.col") ? "▲ " : "▼ ") +
    L.length +
    " " +
    t("unitsSuffix");
  $("#qc").innerHTML = S.q
    ? `<button class="b" data-a="cq">${ic("pin")} ${S.q.name} · ${S.rad} km ✕</button>`
    : "";
  $("#cards").innerHTML = L.length
    ? L.map(card).join("")
    : `<div class="em" style="grid-column:1/-1"><div class="big">${ic("map")}</div><h3>${t("emptyTitle")}</h3><p>${t("emptyDesc")}</p><button class="b p" data-a="cf">${t("filterClear")}</button> ${S.q ? `<button class="b" data-a="rad">${t("expandRadius")}</button>` : ""}</div>`;
  $("#fv").innerHTML = ic("heart", S.favOnly) + " " + S.fav.length;
  $("#fv").classList.toggle("p", S.favOnly);
}
/* ---- selection / mini ---- */
function pick(id, f) {
  const p = P.find((x) => x.id == id);
  if (!p) return;
  S.sel = id;
  const m = $("#mini");
  m.style.display = "flex";
  m.innerHTML = `<img src="${im(p)}" alt=""><div style="flex:1;min-width:0"><div class="pr">${$$(p.price)}</div><div>${ic("bed")} ${p.rooms} ${t("roomsWord")} · ${ic("area")} ${p.area} m²</div><div class="mu">${ic("pin")} ${p.addr}</div><button class="b p" style="margin-top:6px" data-a="det" data-id="${p.id}">${t("detTitle")}</button></div><button class="x" data-a="cm">✕</button>`;
  if (f) fly(p.lat, p.lng, 15);
  else render();
  mks.forEach((e, i) => e.classList.toggle("on", i == id));
  setTimeout(
    () => {
      list();
      const c = document.querySelector(`#cards [data-id="${id}"]`);
      c && c.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    f ? 600 : 150,
  );
}
/* ---------- 6) Detail sahifa ---------- */
function openDet(id, nohash) {
  const p = P.find((x) => x.id == id);
  if (!p) return;
  if (!nohash) location.hash = "uy-" + id;
  const d = $("#det"),
    fv = S.fav.includes(id),
    stu = p.cat == "student";
  const near = P.filter((x) => x.id != id)
    .map((x) => ({ ...x, km: hav(p.lat, p.lng, x.lat, x.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 4);
  d.innerHTML = `<div class="dw"><button class="b" data-a="dc">${t("detBack")}</button><div class="dg" style="margin-top:12px"><div><div class="gal"><img id="gi" src="${im(p)}" alt=""><button class="n" style="left:10px" data-a="gp">‹</button><button class="n" style="right:10px" data-a="gn">›</button></div><div class="th">${Array.from(
    { length: nimg(p) },
    (_, i) => i,
  )
    .map(
      (i) =>
        `<img class="${i ? "" : "on"}" data-a="gt" data-k="${i}" src="${im(p, i)}" alt="">`,
    )
    .join("")}</div>
<h1 style="margin:16px 0 4px;font-size:26px">${pTitle(p)}</h1><div class="mu">${ic("pin")} ${p.addr}, Toshkent</div><div class="pr" style="font-size:28px;margin:8px 0">${$$(p.price)}${p.old ? `<s>${$$(p.old)}</s>` : ""}${stu ? ` <span style="font-size:14px;font-weight:600;color:var(--mu)">${t("perMonth")}</span>` : ""}</div>
<div class="kv"><div>${t("detRooms")}<b>${p.rooms}</b></div><div>${t("detArea")}<b>${p.area} m²</b></div><div>${t("detFloor")}<b>${p.floor}/${p.fl2}</b></div><div>${t("detYear")}<b>${p.year}</b></div><div>${t("detType")}<b>${typeLabel(p.type)}</b></div></div>
<div class="box"><b>${t("detDesc")}</b><p style="color:var(--mu);line-height:1.6;margin:6px 0 0">${pDesc(p)}</p>${stu ? `<p style="color:var(--ac);font-weight:600;margin:8px 0 0">${t("studentNoteTpl")(p.uni)}</p>` : ""}</div><h3>${t("detMapTitle")}</h3><canvas id="dm" style="width:100%;height:260px;border-radius:16px;display:block"></canvas></div>
<div><div class="box" style="position:sticky;top:12px"><b>${t("detContact")}</b><p class="mu">${t("detPhone")} ${p.phone}</p><a class="b p" style="display:block;text-align:center;text-decoration:none;margin-bottom:8px" href="tel:${p.phone.replace(/\s/g, "")}">${ic("phone")} ${t("detCall")}</a><button class="b" style="width:100%;margin-bottom:8px" data-a="chat" data-id="${id}">${ic("chat")} ${t("detChat")}</button><div class="ac"><button class="b" id="dfav" data-a="fav" data-id="${id}">${favT(fv)}</button><button class="b" data-a="sh">${t("detShare")}</button></div></div></div></div>
<h2>${t("detNearby")}</h2><div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));padding-bottom:30px">${near.map(card).join("")}</div></div>`;
  d.classList.add("o");
  d.scrollTop = 0;
  d._p = p;
  d._k = 0;
  const c = $("#dm"),
    r = devicePixelRatio || 1,
    w = c.clientWidth,
    h = 260;
  c.width = w * r;
  c.height = h * r;
  const x = c.getContext("2d");
  x.setTransform(r, 0, 0, r, 0, 0);
  bg(x, w, h, p.lat, p.lng, 14);
  near.forEach((o) => {
    const [a, b] = pr(p.lat, p.lng, 14),
      [u, v] = pr(o.lat, o.lng, 14);
    x.beginPath();
    x.arc(w / 2 + u - a, h / 2 + v - b, 7, 0, 7);
    x.fillStyle = "#123330";
    x.fill();
  });
  x.save();
  x.translate(w / 2, h / 2);
  x.fillStyle = "#0f7a6c";
  x.strokeStyle = "#fff";
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(0, 0);
  x.bezierCurveTo(-16, -18, -14, -38, 0, -38);
  x.bezierCurveTo(14, -38, 16, -18, 0, 0);
  x.fill();
  x.stroke();
  x.fillStyle = "#fff";
  x.beginPath();
  x.arc(0, -24, 5, 0, 7);
  x.fill();
  x.restore();
}
function closeDet() {
  $("#det").classList.remove("o");
  if (location.hash)
    history.replaceState(null, "", location.pathname + location.search);
}
function gal(k) {
  const d = $("#det"),
    p = d._p;
  const n = nimg(p);
  d._k = (k + n) % n;
  $("#gi").src = im(p, d._k);
  d.querySelectorAll(".th img").forEach((e, i) =>
    e.classList.toggle("on", i == d._k),
  );
}
addEventListener("hashchange", () => {
  const m = location.hash.match(/uy-(p\d+)/);
  m ? openDet(m[1], 1) : $("#det").classList.remove("o");
});
/* ---------- 7) Kirish, profil, e'lon ---------- */
function modal(h) {
  $("#mb").innerHTML = h;
  $("#md").classList.add("o");
}
const closeM = () => $("#md").classList.remove("o");
$("#md").onclick = (e) => {
  if (e.target.id == "md") closeM();
};
addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    closeM();
    closeDet();
    closeAp();
    $("#dd").style.display = "none";
  }
});
function authUI() {
  $("#au").innerHTML = S.me
    ? `<button class="b" data-a="prof">${ic("user")} ${S.me.name}</button>`
    : `<button class="b" data-a="login">${ic("user")} ${t("login")}</button> <button class="b" data-a="reg">${t("register")}</button>`;
}
const closeAp = () => $("#ap").classList.remove("o");
function authM(reg) {
  closeM();
  const ap = $("#ap");
  ap.innerHTML = `<div class="apw"><div class="apl"><div class="scene big">${house3d()}</div><div class="logo" style="font-size:30px">Uy<i>Map</i></div><h2 style="font-size:28px;margin:18px 0 6px">${t("authHeroTitle")}</h2><p>${t("authHeroDesc")}</p><ul><li>${ic("map")} ${t("authBullet1")}</li><li>${ic("heart")} ${t("authBullet2")}</li><li>${ic("home")} ${t("authBullet3")}</li></ul></div>
<div class="apr"><button class="b" data-a="apc" style="align-self:flex-end">${t("authClose")}</button><div class="apf"><h1 style="margin:0 0 4px">${reg ? t("authRegTitle") : t("authLoginTitle")}</h1><p class="mu">${reg ? t("authRegSub") : t("authLoginSub")}</p><div class="tabs"><button class="b ${reg ? "" : "p"}" data-a="login">${t("authLoginTitle")}</button><button class="b ${reg ? "p" : ""}" data-a="reg">${t("authRegTitle")}</button></div>
<form class="mf" id="af">${reg ? `<label>${t("authName")}<input name="n" required></label>` : ""}<label>${t("authEmail")}<input name="e" type="email" required></label><label>${t("authPass")}<input name="p" id="pwi" type="password" minlength="4" required></label><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="pws" style="width:auto"> ${t("authShowPass")}</label><button class="b p">${reg ? t("authRegTitle") : t("authLoginTitle")}</button><button type="button" class="b" data-a="demo" style="padding:11px">${t("authDemo")}</button></form><p class="mu" style="font-size:12px;margin-top:14px">${t("authNote")}</p></div></div></div>`;
  ap.classList.add("o");
  $("#pws").onchange = (e) =>
    ($("#pwi").type = e.target.checked ? "text" : "password");
  $("#af").onsubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target)),
      us = g("uymap_users", []);
    if (reg) {
      if (us.some((u) => u.e == f.e)) return toast(t("toastEmailExists"));
      f.joined = Date.now();
      us.push(f);
      sv("uymap_users", us);
      S.me = { name: f.n, e: f.e, phone: f.phone || "", joined: f.joined };
    } else {
      const u = us.find((u) => u.e == f.e && u.p == f.p);
      if (!u) return toast(t("toastWrongCred"));
      if (!u.joined) {
        u.joined = Date.now();
        sv("uymap_users", us);
      }
      S.me = { name: u.n, e: u.e, phone: u.phone || "", joined: u.joined };
    }
    sv("uymap_me", S.me);
    authUI();
    closeAp();
    toast(t("toastWelcome")(S.me.name));
  };
}
function myChatCount() {
  try {
    return Object.keys(localStorage).filter(
      (k) =>
        k.startsWith("uymap_chat_") &&
        JSON.parse(localStorage.getItem(k) || "[]").length,
    ).length;
  } catch (e) {
    return 0;
  }
}
function profM(edit) {
  const my = P.filter((p) => p.owner == S.me.e),
    fv = P.filter((p) => S.fav.includes(p.id)),
    gr = (l) =>
      l.length
        ? `<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(270px,1fr))">${l.map(card).join("")}</div>`
        : `<p class="mu">${t("emptyList")}</p>`;
  const esc = (v) => (v || "").replace(/"/g, "&quot;");
  const locale = LANG == "uz" ? "uz-UZ" : LANG == "ru" ? "ru-RU" : "en-US";
  const joined = S.me.joined
    ? new Date(S.me.joined).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
      })
    : "—";
  const editHtml = edit
    ? `<form id="profEditForm" class="mf" style="margin-top:14px"><div class="g2"><label>${t("profEditName")}<input name="n" value="${esc(S.me.name)}" required></label><label>${t("profEditPhone")}<input name="ph" value="${esc(S.me.phone)}" placeholder="+998 "></label></div><div class="ac" style="margin-top:8px"><button class="b p" type="submit">${t("profEditSave")}</button><button class="b" type="button" id="profEditCancelBtn">${t("profEditCancel")}</button></div></form>`
    : "";
  $("#ap").innerHTML =
    `<div class="aphdr"><div class="logo" data-a="apc" style="cursor:pointer">Uy<i>Map</i></div><div class="rt"><button class="b" id="apTt" aria-label="Theme">${ic(THEME == "dark" ? "sun" : "moon")}</button><button class="b" id="apLgl">${LANG.toUpperCase()}</button><button class="b" data-a="apc">${t("profBack")}</button><button class="b" data-a="out">${t("logout")}</button></div></div>
<div class="pw"><div class="box proCard"><div class="row" style="gap:16px;align-items:center;flex-wrap:wrap"><div class="av">${S.me.name[0].toUpperCase()}</div><div style="flex:1;min-width:160px"><h1 style="margin:0;font-size:24px">${S.me.name}</h1><div class="mu">${S.me.e}</div><div class="mu" style="margin-top:2px">${S.me.phone ? S.me.phone : t("profPhoneNone")}</div></div>${edit ? "" : `<button class="b" id="profEditBtn">${ic("user")} ${t("profEdit")}</button>`}</div>${editHtml}<div class="mu" style="margin-top:12px;font-size:13px">${ic("user")} ${t("profMemberSince")}: ${joined}</div></div>
<div class="profStats"><div class="stat"><b>${my.length}</b><span>${t("profStatListings")}</span></div><div class="stat"><b>${fv.length}</b><span>${t("profStatSaved")}</span></div><div class="stat"><b>${myChatCount()}</b><span>${t("profStatChats")}</span></div></div>
<div class="row" style="justify-content:space-between;align-items:center;margin-top:24px"><h2 style="margin:0">${t("myListings")} (${my.length})</h2><button class="b p" data-a="add">${t("addProperty")}</button></div>${gr(my)}
<h2 style="margin-top:24px">${t("savedTitle")} (${fv.length})</h2>${gr(fv)}</div>`;
  $("#ap").classList.add("o");
  $("#ap").scrollTop = 0;
  $("#apTt").onclick = () => {
    toggleTheme();
    profM(edit);
  };
  $("#apLgl").onclick = () => {
    const order = ["uz", "ru", "en"];
    setLang(order[(order.indexOf(LANG) + 1) % order.length]);
    profM(edit);
  };
  if (!edit) {
    $("#profEditBtn").onclick = () => profM(true);
  } else {
    $("#profEditCancelBtn").onclick = () => profM(false);
    $("#profEditForm").onsubmit = (ev) => {
      ev.preventDefault();
      const fd = Object.fromEntries(new FormData(ev.target)),
        name = fd.n.trim() || S.me.name,
        phone = fd.ph.trim();
      S.me = { ...S.me, name, phone };
      sv("uymap_me", S.me);
      const us = g("uymap_users", []),
        i = us.findIndex((u) => u.e == S.me.e);
      if (i > -1) {
        us[i].n = name;
        us[i].phone = phone;
        sv("uymap_users", us);
      }
      authUI();
      toast(t("toastProfileUpdated"));
      profM(false);
    };
  }
}
function addM() {
  if (!S.me) {
    toast(t("toastLoginFirst"));
    return authM(false);
  }
  modal(
    `<h3 style="margin:0">${t("addFormTitle")}</h3><form class="mf" id="pf"><label>${t("addTitleLbl")}<input name="title" required></label><div class="g2"><label>${t("addTypeLbl")}<select name="type">${T.map((tp) => `<option value="${tp}">${typeLabel(tp)}</option>`).join("")}</select></label><label>${t("addDistLbl")}<select name="dist">${D.map((d) => `<option>${d[0]}</option>`).join("")}</select></label></div><label>${t("addStreetLbl")}<input name="st" required></label><div class="g2"><label>${t("addPriceLbl")}<input name="price" type="number" min="1000" required></label><label>${t("addAreaLbl")}<input name="area" type="number" min="10" required></label><label>${t("addRoomsLbl")}<input name="rooms" type="number" min="1" value="2" required></label><label>${t("addFloorLbl")}<input name="floor" type="number" min="1" value="1"></label></div><label>${t("addPhoneLbl")}<input name="phone" required value="+998 "></label><label>${t("addDescLbl")}<textarea name="desc" rows="3"></textarea></label><label>${t("addImagesLbl")}<input type="file" id="pimg" accept="image/*" multiple></label><div id="pimgPrev" class="imgprev"></div><button class="b p" style="padding:11px" id="pfSubmit">${t("addSubmit")}</button></form>`,
  );
  $("#pimg").onchange = (e) => {
    let files = [...e.target.files];
    if (files.length > 6) {
      toast(t("imgTooMany"));
      files = files.slice(0, 6);
    }
    $("#pimgPrev").innerHTML = files
      .map((f) => `<img src="${URL.createObjectURL(f)}">`)
      .join("");
  };
  $("#pf").onsubmit = async (e) => {
    e.preventDefault();
    const btn = $("#pfSubmit"),
      f = Object.fromEntries(new FormData(e.target)),
      d = D.find((x) => x[0] == f.dist),
      big = f.type == "Hovli" || f.type == "Villa";
    const files = [...$("#pimg").files].slice(0, 6);
    let images = [];
    if (files.length) {
      btn.disabled = true;
      btn.textContent = t("imgUploading");
      try {
        images = await Promise.all(files.map((fl) => readImgResized(fl)));
      } catch (err) {
        images = [];
      }
      btn.disabled = false;
      btn.textContent = t("addSubmit");
    }
    const p = {
      id: "p" + (100 + UP.length),
      title: f.title,
      price: +f.price,
      old: 0,
      lat: d[1] + (Math.random() - 0.5) * 0.02,
      lng: d[2] + (Math.random() - 0.5) * 0.03,
      rooms: +f.rooms,
      area: +f.area,
      type: f.type,
      cat:
        f.type == "Yangi uy"
          ? "new"
          : f.type == "Eski uy"
            ? "old"
            : big
              ? "vov"
              : "new",
      dist: f.dist,
      st: f.st,
      addr: `${f.st}, ${f.dist}`,
      floor: +f.floor || 1,
      fl2: +f.floor || 1,
      year: new Date().getFullYear(),
      sale: false,
      date: Date.now(),
      phone: f.phone,
      owner: S.me.e,
      desc: f.desc || t("defaultDesc"),
      images,
    };
    UP.push(p);
    sv("uymap_props", UP);
    P = [...base, ...STUD, ...UP];
    closeM();
    S.q = null;
    S.cat = "all";
    setNav(2, true);
    toast(t("toastListed"));
    pick(p.id, true);
  };
}
/* ---- chat ---- */
function chatKey(pid) {
  return "uymap_chat_" + pid;
}
function chatMsgs(pid) {
  return g(chatKey(pid), []);
}
function chatSave(pid, msgs) {
  sv(chatKey(pid), msgs);
}
function chatRenderList(pid) {
  const L = chatMsgs(pid),
    box = $("#cmlist");
  if (!box) return;
  box.innerHTML = L.length
    ? L.map(
        (m) =>
          `<div class="cmsg ${m.from}"><div class="bub">${m.text}</div></div>`,
      ).join("")
    : `<div class="mu" style="text-align:center;padding:20px 0">${t("chatEmpty")}</div>`;
  box.scrollTop = box.scrollHeight;
}
function openChat(id) {
  const p = P.find((x) => x.id == id);
  if (!p) return;
  if (!S.me) {
    toast(t("chatLoginFirst"));
    return authM(false);
  }
  closeDet();
  const pid = p.id;
  let L = chatMsgs(pid);
  if (!L.length) {
    L = [{ from: "seller", text: t("chatSellerIntro") }];
    chatSave(pid, L);
  }
  modal(
    `<div class="row" style="margin-bottom:8px"><b>${t("chatWith")(p.owner ? p.owner.split("@")[0] : "UyMap seller")}</b><button class="b" data-a="cclose" style="margin-left:auto">✕</button></div><div id="cmlist" class="cmlist"></div><form id="cform" class="row" style="gap:6px;margin-top:10px"><input id="cmsg" autocomplete="off" placeholder="${t("chatPh")}" style="flex:1;padding:10px 13px;border-radius:12px;border:1px solid var(--bd);background:var(--cd);color:var(--tx);font:inherit;font-size:14px"><button class="b p" style="padding:0 14px" aria-label="${t("chatSend")}">${ic("send")}</button></form>`,
  );
  $("#md")._pid = pid;
  chatRenderList(pid);
  $("#cform").onsubmit = (e) => {
    e.preventDefault();
    const inp = $("#cmsg"),
      v = inp.value.trim();
    if (!v) return;
    const L2 = chatMsgs(pid);
    L2.push({ from: "me", text: v });
    chatSave(pid, L2);
    inp.value = "";
    chatRenderList(pid);
    setTimeout(
      () => {
        const L3 = chatMsgs(pid);
        L3.push({
          from: "seller",
          text: t("chatSellerReplies")[
            Math.floor(Math.random() * t("chatSellerReplies").length)
          ],
        });
        chatSave(pid, L3);
        if ($("#md").classList.contains("o") && $("#md")._pid == pid)
          chatRenderList(pid);
      },
      900 + Math.random() * 900,
    );
  };
}
/* ---------- 8) Qidiruv va navigatsiya ---------- */
function idx() {
  const a = D.map((d) => ({
    k: "pin",
    t: d[0],
    s: t("searchDistrictLabel"),
    lat: d[1],
    lng: d[2],
  }));
  D.forEach((d) =>
    d[3].forEach((st) => {
      const L = P.filter((p) => p.st == st);
      a.push({
        k: "road",
        t: st,
        s: d[0],
        lat: L.length ? L.reduce((x, p) => x + p.lat, 0) / L.length : d[1],
        lng: L.length ? L.reduce((x, p) => x + p.lng, 0) / L.length : d[2],
      });
    }),
  );
  P.forEach((p) =>
    a.push({
      k: "home",
      t: pTitle(p),
      s: p.addr,
      id: p.id,
      lat: p.lat,
      lng: p.lng,
    }),
  );
  T.forEach((tp) =>
    a.push({ k: "tag", t: typeLabel(tp), s: t("searchTypeLabel"), type: tp }),
  );
  return a;
}
let SG = [],
  hi = 0;
const qi = $("#q");
function sug() {
  const v = qi.value.trim().toLowerCase(),
    dd = $("#dd");
  if (!v) {
    dd.style.display = "none";
    SG = [];
    return;
  }
  SG = idx()
    .filter(
      (i) => i.t.toLowerCase().includes(v) || i.s.toLowerCase().includes(v),
    )
    .sort(
      (a, b) =>
        b.t.toLowerCase().startsWith(v) - a.t.toLowerCase().startsWith(v),
    )
    .slice(0, 7);
  if (/^\d[\d\s]*$/.test(v)) {
    let n = +v.replace(/\s/g, "");
    if (n < 1000) n *= 1000;
    SG.unshift({
      k: "dollar",
      t: t("searchPricePrefix")($$(n)),
      s: t("searchPriceLabel"),
      price: n,
    });
  }
  hi = 0;
  dd.innerHTML = SG.length
    ? SG.map(
        (i, n) =>
          `<div class="${n ? "" : "h"}" data-n="${n}">${ic(i.k)} ${i.t}<small>${i.s}</small></div>`,
      ).join("")
    : `<div>${t("searchNoResults")}</div>`;
  dd.style.display = "block";
}
function chosen(i) {
  $("#dd").style.display = "none";
  qi.value = i.type ? "" : i.price ? "" : i.t;
  if (i.type) {
    S.f.type = i.type;
    $("#ftp").value = i.type;
    toast(t("toastFilterType")(typeLabel(i.type)));
    render();
    return;
  }
  if (i.price) {
    S.f.max = i.price;
    $("#fmx").value = i.price;
    toast(t("toastMaxPrice")($$(i.price)));
    render();
    return;
  }
  setQ({
    lat: i.lat,
    lng: i.lng,
    name: i.t.length > 24 ? i.t.slice(0, 22) + "…" : i.t,
  });
  if (i.id) setTimeout(() => pick(i.id), 700);
}
function setQ(q) {
  S.q = q;
  S.rad = 5;
  if (document.body.classList.contains("v-list")) setNav(2, true);
  fly(q.lat, q.lng, 14);
  const n = vis().length;
  toast(n ? t("toastFoundNear")(n, S.rad) : t("toastNoResultsNear"));
}
qi.oninput = sug;
qi.onfocus = sug;
qi.onkeydown = (e) => {
  const it = [...$("#dd").children];
  if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    e.preventDefault();
    hi = (hi + (e.key == "ArrowDown" ? 1 : -1) + it.length) % it.length;
    it.forEach((x, n) => x.classList.toggle("h", n == hi));
  }
  if (e.key == "Enter") {
    SG[hi] ? chosen(SG[hi]) : toast(t("toastAddrNotFound"));
  }
};
$("#dd").onclick = (e) => {
  const d = e.target.closest("[data-n]");
  d && chosen(SG[+d.dataset.n]);
};
document.addEventListener("click", (e) => {
  if (!e.target.closest(".sw")) $("#dd").style.display = "none";
});
/* ---- nav / filters ---- */
function setNav(i, keep) {
  S.nav = i;
  const n = NV[i];
  S.cat = n[1];
  if (!keep) S.q = null;
  document.body.className = "v-" + n[0];
  $("#nv")
    .querySelectorAll("a")
    .forEach((a, k) => a.classList.toggle("on", k == i));
  $("#list").classList.remove("col");
  const pr = PAGE_RENDER[n[0]];
  if (pr) {
    pr();
    return;
  }
  setTimeout(() => {
    resize();
    if (n[1] != "all" && n[0] == "map") fit(fl());
  }, 60);
}
function renderChrome() {
  $("#q").placeholder = t("searchPh");
  $("#heroT").textContent = t("heroTitle");
  $("#heroD").textContent = t("heroDesc");
  $("#nv").innerHTML = NV.map(
    (n, i) =>
      `<a data-a="nav" data-i="${i}" class="${i == S.nav ? "on" : ""}">${navLabel(i)}</a>`,
  ).join("");
  $("#so").innerHTML =
    `<option value="new">${t("sortNew")}</option><option value="pa">${t("sortPa")}</option><option value="pd">${t("sortPd")}</option><option value="ar">${t("sortAr")}</option>`;
  $("#so").value = S.sort;
  $("#ft").textContent = t("filterBtn");
  $("#ftp").innerHTML =
    `<option value="">${t("filterType")}</option>` +
    T.map((tp) => `<option value="${tp}">${typeLabel(tp)}</option>`).join("");
  $("#ftp").value = S.f.type || "";
  $("#fds").innerHTML =
    `<option value="">${t("filterDist")}</option>` +
    D.map((d) => `<option>${d[0]}</option>`).join("");
  $("#fds").value = S.f.dist || "";
  $("#frm").querySelector('option[value=""]').textContent = t("filterRooms");
  $("#fct").innerHTML = `<option value="Tashkent">${t("filterCity")}</option>`;
  $("#fmn").placeholder = t("priceMin");
  $("#fmx").placeholder = t("priceMax");
  $("#fan").placeholder = t("areaMin");
  $("#fax").placeholder = t("areaMax");
  $("#fc").textContent = t("filterClear");
  $("#pop").innerHTML = D.map(
    (d, i) =>
      `<span class="chip" data-a="loc" data-i="${i}">${ic("pin")} ${d[0]}</span>`,
  ).join("");
  $("#feat").innerHTML = [...P]
    .sort((a, b) => b.price - a.price)
    .slice(0, 6)
    .map(
      (p) =>
        `<div class="fc" data-a="det" data-id="${p.id}"><img src="${im(p)}" alt=""><div><b>${sh(p.price)}</b>${p.rooms} ${t("roomsWord")} · ${p.dist}</div></div>`,
    )
    .join("");
  $("#adt").textContent = t("addProperty");
  $("#lgl").textContent = LANG.toUpperCase();
  $("#lgl").title = t("langLabel");
  $("#tt").title = t("themeLabel");
  $("#zi").setAttribute("aria-label", "Zoom in");
  $("#zo").setAttribute("aria-label", "Zoom out");
  $("#lc").setAttribute("aria-label", t("themeLabel"));
  authUI();
}
function applyLang() {
  renderChrome();
  applyTheme();
  const pr = PAGE_RENDER[NV[S.nav][0]];
  if (pr) pr();
  else list();
  if (document.getElementById("det") && $("#det").classList.contains("o")) {
    const m = location.hash.match(/uy-(p\d+)/);
    if (m) openDet(m[1], 1);
  }
}
$("#tt").onclick = toggleTheme;
$("#lgl").onclick = () => {
  const order = ["uz", "ru", "en"];
  setLang(order[(order.indexOf(LANG) + 1) % order.length]);
};
const fmap = {
  ftp: ["type", (v) => v],
  fds: ["dist", (v) => v],
  frm: ["rooms", (v) => +v],
  fmn: ["min", (v) => +v],
  fmx: ["max", (v) => +v],
  fan: ["amin", (v) => +v],
  fax: ["amax", (v) => +v],
};
Object.keys(fmap).forEach((id) =>
  $("#" + id).addEventListener("input", (e) => {
    S.f[fmap[id][0]] = e.target.value ? fmap[id][1](e.target.value) : "";
    render();
  }),
);
$("#so").addEventListener("change", (e) => {
  S.sort = e.target.value;
  list();
});
$("#ft").onclick = () => $("#fl").classList.toggle("o");
const clearF = () => {
  S.f = {};
  ["ftp", "fds", "frm", "fmn", "fmx", "fan", "fax"].forEach(
    (i) => ($("#" + i).value = ""),
  );
  render();
};
$("#fc").onclick = clearF;
$("#fv").onclick = () => {
  S.favOnly = !S.favOnly;
  if (S.favOnly && !S.fav.length) toast(t("toastNoFav"));
  render();
};
$("#lh").onclick = () => {
  $("#list").classList.toggle("col");
  list();
};
$("#lg").onclick = () => setNav(0);
$("#ad").onclick = addM;
/* ---- global actions ---- */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-a]");
  if (!el) return;
  const a = el.dataset.a,
    id = el.dataset.id;
  if (a == "det" || a == "map") closeAp();
  if (a == "det") openDet(id);
  else if (a == "fav") {
    e.stopPropagation();
    const i = S.fav.indexOf(id);
    i < 0 ? S.fav.push(id) : S.fav.splice(i, 1);
    sv("uymap_fav", S.fav);
    toast(i < 0 ? t("toastFavAdd") : t("toastFavRem"));
    list();
    const b = $("#dfav");
    if (b && b.dataset.id == id) b.innerHTML = favT(i < 0);
    el.innerHTML = favT(i < 0);
  } else if (a == "map") {
    e.stopPropagation();
    closeDet();
    if (document.body.classList.contains("v-list")) setNav(2, true);
    setTimeout(() => pick(id, true), 80);
  } else if (a == "nav") setNav(+el.dataset.i);
  else if (a == "loc") {
    const d = D[+el.dataset.i];
    setQ({ lat: d[1], lng: d[2], name: d[0] });
  } else if (a == "cq") {
    S.q = null;
    render();
  } else if (a == "cf") clearF();
  else if (a == "rad") {
    S.rad = 15;
    fly(S.q.lat, S.q.lng, 12.5);
  } else if (a == "cm") {
    $("#mini").style.display = "none";
    S.sel = null;
    render();
  } else if (a == "dc") closeDet();
  else if (a == "gt") gal(+el.dataset.k);
  else if (a == "gn") gal($("#det")._k + 1);
  else if (a == "gp") gal($("#det")._k - 1);
  else if (a == "sh") {
    const u = location.href;
    navigator.clipboard
      ? navigator.clipboard.writeText(u).then(
          () => toast(t("toastLinkCopied")),
          () => toast(u),
        )
      : toast(u);
  } else if (a == "chat") openChat(id);
  else if (a == "bchat") openBrokerChat(id);
  else if (a == "dchat") openDeliveryChat(id);
  else if (a == "cclose") closeM();
  else if (a == "prof") profM();
  else if (a == "apc") closeAp();
  else if (a == "add") {
    closeAp();
    addM();
  } else if (a == "demo") {
    const us = g("uymap_users", []);
    let du = us.find((u) => u.e == "demo@uymap.uz");
    if (!du) {
      du = {
        n: "Demo",
        e: "demo@uymap.uz",
        p: "demo",
        phone: "+998 90 123 45 67",
        joined: Date.now(),
      };
      us.push(du);
      sv("uymap_users", us);
    }
    S.me = {
      name: du.n,
      e: du.e,
      phone: du.phone || "",
      joined: du.joined || Date.now(),
    };
    sv("uymap_me", S.me);
    authUI();
    closeAp();
    toast(t("toastDemoLogin"));
  } else if (a == "login") authM(false);
  else if (a == "reg") authM(true);
  else if (a == "out") {
    S.me = null;
    sv("uymap_me", null);
    authUI();
    closeAp();
    toast(t("toastLoggedOut"));
  }
});
document.documentElement.lang = LANG;
$("#hs").innerHTML = house3d();
applyTheme();
renderChrome();
resize();
list();
setTimeout(() => {
  $("#ld").classList.add("h");
  const m = location.hash.match(/uy-(p\d+)/);
  if (m) openDet(m[1], 1);
}, 650);

/* Rasm yuklanmasa (havola o'chgan bo'lsa) demo rasm ko'rsatiladi */
document.addEventListener(
  "error",
  (e) => {
    const t = e.target;
    if (t.tagName == "IMG" && !t.dataset.f) {
      t.dataset.f = 1;
      t.src = im({ id: "p0", type: "Uy" }, 0);
    }
  },
  true,
);

/* ---- 3D tilt: kursor bo'yicha kartalar egilishi ---- */
(() => {
  const TILT = {
      ".c": 7,
      ".bkc": 7,
      ".stat": 10,
      ".fc": 10,
      ".gal": 3,
      ".kv div": 10,
      "#pb .pbst div": 12,
      "#cats .ct": 9,
    },
    keys = Object.keys(TILT),
    TS = keys.join(",");
  if (
    !matchMedia("(hover:hover) and (pointer:fine)").matches ||
    matchMedia("(prefers-reduced-motion:reduce)").matches
  )
    return;
  let cur = null;
  const rst = (el) => {
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.classList.remove("tl");
  };
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest ? e.target.closest(TS) : null;
    if (cur && cur !== el) rst(cur);
    cur = el;
    if (!el) return;
    const m = TILT[keys.find((k) => el.matches(k))],
      r = el.getBoundingClientRect(),
      px = (e.clientX - r.left) / r.width,
      py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", ((px - 0.5) * 2 * m).toFixed(2) + "deg");
    el.style.setProperty("--rx", ((0.5 - py) * 2 * m).toFixed(2) + "deg");
    el.style.setProperty("--mx", (px * 100).toFixed(0) + "%");
    el.style.setProperty("--my", (py * 100).toFixed(0) + "%");
    el.classList.add("tl");
  });
  document.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget && cur) {
      rst(cur);
      cur = null;
    }
  });
})();

/* =====================================================================
   UyMap — 3d.js
   3D sahnalar, bo'lim bannerlari, bosh sahifa kartalari,
   xaritadagi 3D binolar, sahifa o'tish animatsiyalari
   ===================================================================== */
(() => {
  "use strict";
  const CATS = ["new", "old", "vov", "student"];
  const COL = {
    sale: "#d9602f",
    new: "#2f7be0",
    old: "#b98a3e",
    vov: "#4fa83a",
    student: "#8a5ae0",
    brokers: "#d0457a",
    delivery: "#e08a12",
    list: "#17a08c",
    def: "#17a08c",
  };
  const catOf = (p) => (p.sale ? "sale" : CATS.includes(p.cat) ? p.cat : "def");
  const ACC = "var(--ac)";
  /* Zaif qurilma / telefon: yengil rejim (aylanish yo'q, kam element) */
  /* Yengil rejim standart. To'liq (aylanuvchi) rejim uchun index.html ga
     <script>window.UYFULL = true</script> qo'shing. */
  const LOW = window.UYFULL
    ? matchMedia("(max-width:899px)").matches ||
      (navigator.hardwareConcurrency || 8) <= 4 ||
      (navigator.deviceMemory || 8) <= 4
    : true;
  if (LOW) document.documentElement.classList.add("lite");
  let LT = false;

  /* ---------- 3D qurilish bloklari ---------- */
  const bx = (w, h, d, c, x = 0, y = 0, z = 0, o = {}) =>
    LT && o.d
      ? ""
      : `<div class="bx${o.cls ? " " + o.cls : ""}" style="--w:${w}px;--h:${h}px;--d:${d}px;--c:${c};left:calc(50% - ${w / 2}px);top:calc(50% - ${h / 2}px);transform:translate3d(${x}px,${y}px,${z}px)${o.rot ? ` rotateY(${o.rot}deg)` : ""}${o.rx ? ` rotateX(${o.rx}deg)` : ""}"><i class="fr">${o.t || ""}</i><i class="k"></i><i class="r"></i><i class="l"></i><i class="t"></i></div>`;
  const tri = (w, h, c, x, y, z, ry) =>
    `<div class="tri" style="--w:${w}px;--h:${h}px;--c:${c};left:calc(50% - ${w / 2}px);top:calc(50% - ${h / 2}px);transform:translate3d(${x}px,${y}px,${z}px) rotateY(${ry}deg)"></div>`;
  const G = (w, d, c) => bx(w, 5, d, c, 0, 44, 0);
  const house = (wall, roof) =>
    bx(70, 40, 54, wall, 0, 22, 0) +
    bx(12, 22, 3, "#7a4426", -14, 31, 28, { d: 1 }) +
    bx(12, 12, 3, "#cfe9ff", 14, 20, 28, { d: 1 }) +
    bx(3, 12, 12, "#cfe9ff", 36, 20, 0, { d: 1 }) +
    bx(84, 5, 34, roof, 0, -7.5, 13.5, { rx: -35 }) +
    bx(84, 5, 34, roof, 0, -7.5, -13.5, { rx: 35 }) +
    tri(54, 19, wall, 35, -7.5, 0, 90) +
    tri(54, 19, wall, -35, -7.5, 0, 90) +
    bx(8, 18, 8, "#8a4a30", -22, -8, -10, { d: 1 });
  const tree = (x, z) =>
    bx(8, 14, 8, "#7a4a26", x, 35, z, { d: 1 }) +
    bx(30, 16, 30, "#4fa83a", x, 20, z) +
    bx(20, 14, 20, "#6cc04a", x, 6, z);

  const SC = {
    load: () => bx(46, 46, 46, ACC, 0, 0, 0, { cls: "win" }),
    list: () => {
      const hs = [34, 52, 26, 60, 38, 22, 44, 30, 56];
      return (
        G(150, 150, "#cfe3dd") +
        hs
          .slice(0, LT ? 5 : 9)
          .map((H, i) =>
            bx(
              28,
              H,
              28,
              i % 2 ? ACC : "#6fa99d",
              ((i % 3) - 1) * 42,
              41.5 - H / 2,
              (Math.floor(i / 3) - 1) * 42,
              { cls: "win" },
            ),
          )
          .join("")
      );
    },
    sale: () =>
      G(120, 90, "#f3d9cf") +
      bx(64, 84, 8, ACC, 0, -2, 0, { t: "%" }) +
      bx(26, 6, 26, "#ffd166", -54, 38, 24) +
      bx(26, 6, 26, "#ffd166", -54, 32, 24, { d: 1 }) +
      bx(26, 6, 26, "#ffd166", -54, 26, 24, { d: 1 }),
    new: () =>
      G(130, 100, "#cfdcf0") +
      bx(66, 28, 66, "#3b6fc4", 0, 27.5, 0, { cls: "win" }) +
      bx(52, 28, 52, "#4a82da", 0, -0.5, 0, { cls: "win" }) +
      bx(38, 28, 38, "#6b9be6", 0, -28.5, 0, { cls: "win" }) +
      bx(6, 26, 6, "#e8f1ee", 0, -55.5, 0),
    old: () => G(130, 100, "#ead9bd") + house("#d9c3a0", "#8a4a30"),
    vov: () =>
      G(160, 110, "#cfe8bf") +
      house("#f0e8d8", "#b2552f") +
      tree(62, 22) +
      tree(-62, -22),
    student: () =>
      G(120, 90, "#e0d6f5") +
      bx(70, 12, 50, "#d9534f", 0, 36, 0) +
      bx(62, 12, 46, "#2f7be0", 0, 24, 0, { rot: 12 }) +
      bx(66, 12, 48, "#4fa83a", 0, 12, 0, { rot: -8 }) +
      bx(34, 12, 34, "#222", 0, -1, 0, { rot: 20 }) +
      bx(84, 5, 84, "#2b2b2b", 0, -9, 0, { rot: 45 }) +
      bx(4, 20, 4, "#ffd166", 56, 2, 0),
    brokers: () =>
      bx(96, 62, 6, "#ffffff", 0, 0, 0) +
      bx(96, 16, 8, ACC, 0, -23, 0) +
      bx(22, 22, 9, "#f1c9a5", -28, 2, 0) +
      bx(36, 16, 9, "#5c746f", -28, 22, 0) +
      bx(34, 5, 9, "#c9d6d2", 16, -2, 0, { d: 1 }) +
      bx(28, 5, 9, "#c9d6d2", 13, 8, 0, { d: 1 }) +
      bx(20, 5, 9, ACC, 9, 18, 0),
    delivery: () =>
      bx(170, 6, 80, "#d8dbe0", 0, 44, 0) +
      bx(84, 48, 52, ACC, -22, 14, 0) +
      bx(36, 36, 52, "#2b3a4a", 44, 20, 0) +
      bx(3, 14, 38, "#cfe9ff", 62, 13, 0, { d: 1 }) +
      [-40, -4, 44]
        .map(
          (x) =>
            bx(16, 16, 8, "#1f2937", x, 36, 30, { d: 1 }) +
            bx(16, 16, 8, "#1f2937", x, 36, -30, { d: 1 }),
        )
        .join(""),
  };
  const sceneHTML = (k, lite) => {
    LT = !!lite || LOW;
    const h = `<div class="s3"><div class="w">${(SC[k] || SC.list)()}</div></div>`;
    LT = false;
    return h;
  };
  /* ko'rinmay qolgan sahnalarni to'xtatish (CPU/GPU tejash) */
  const io =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (es) =>
            es.forEach((e) =>
              e.target.classList.toggle("off", !e.isIntersecting),
            ),
          { rootMargin: "40px" },
        )
      : null;
  const watch = () =>
    io &&
    document.querySelectorAll(".s3:not([data-w])").forEach((n) => {
      n.dataset.w = 1;
      io.observe(n);
    });

  /* ---------- Bo'lim matnlari va statistika ---------- */
  const BN = {
    list: {
      uz: [
        "Barcha uylar bir joyda",
        "Katta kartalarda barcha e'lonlarni ko'ring, saralang va filtrlang.",
      ],
      ru: [
        "Все дома в одном месте",
        "Смотрите все объявления на больших карточках, сортируйте и фильтруйте.",
      ],
      en: [
        "All homes in one place",
        "Browse every listing on big cards, then sort and filter.",
      ],
    },
    sale: {
      uz: [
        "Aksiya: chegirmadagi uylar",
        "Narxi tushirilgan uylar. Eski va yangi narxni solishtiring.",
      ],
      ru: [
        "Акции: дома со скидкой",
        "Дома со сниженной ценой. Сравните старую и новую цену.",
      ],
      en: [
        "Deals: discounted homes",
        "Homes with reduced prices. Compare old and new price.",
      ],
    },
    new: {
      uz: [
        "Yangi uylar",
        "Yangi qurilgan, hujjatlari tayyor uylar va zamonaviy binolar.",
      ],
      ru: [
        "Новостройки",
        "Новые дома с готовыми документами и современные здания.",
      ],
      en: [
        "New buildings",
        "Newly built homes with documents ready and modern buildings.",
      ],
    },
    old: {
      uz: [
        "Eski uylar",
        "Ikkilamchi bozor: tayyor ta'mirli, shahar markaziga yaqin uylar.",
      ],
      ru: [
        "Вторичное жильё",
        "Вторичный рынок: дома с готовым ремонтом ближе к центру.",
      ],
      en: [
        "Old houses",
        "Secondary market: renovated homes close to the city center.",
      ],
    },
    vov: {
      uz: [
        "Vovlilar: hovli va villalar",
        "Katta hovli, bog' va oilaviy hayot uchun keng uylar.",
      ],
      ru: [
        "С участком: дворы и виллы",
        "Просторные дома с двором и садом для семьи.",
      ],
      en: [
        "With yard: houses & villas",
        "Spacious homes with a yard and garden for family life.",
      ],
    },
    student: {
      uz: [
        "Talabalar uchun uylar",
        "Universitetga yaqin, arzon oylik ijara. Talaba guvohnomasi bilan.",
      ],
      ru: [
        "Жильё для студентов",
        "Недорогая аренда рядом с университетами. По студенческому билету.",
      ],
      en: [
        "Homes for students",
        "Cheap monthly rent near universities. Student ID required.",
      ],
    },
    brokers: {
      uz: [
        "Ishonchli maklerlar",
        "Tajribali maklerlar uy tanlash va rasmiylashtirishda yordam beradi.",
      ],
      ru: [
        "Надёжные маклеры",
        "Опытные маклеры помогут выбрать дом и оформить сделку.",
      ],
      en: [
        "Trusted brokers",
        "Experienced brokers help you choose a home and handle paperwork.",
      ],
    },
    delivery: {
      uz: [
        "Ko'chirish dastavkasi",
        "UyMap orqali xarid qilganlarga yuk mashinalarida chegirma.",
      ],
      ru: [
        "Доставка для переезда",
        "Скидка на грузовики для тех, кто купил дом через UyMap.",
      ],
      en: [
        "Moving delivery",
        "Discount on moving trucks for those who bought via UyMap.",
      ],
    },
  };
  const LBL = {
    cnt: { uz: "E'lonlar", ru: "Объявлений", en: "Listings" },
    avg: { uz: "O'rtacha narx", ru: "Средняя цена", en: "Avg. price" },
    min: { uz: "Eng arzon", ru: "Самое дешёвое", en: "Cheapest" },
    disc: {
      uz: "O'rtacha chegirma",
      ru: "Средняя скидка",
      en: "Avg. discount",
    },
    area: { uz: "O'rtacha maydon", ru: "Ср. площадь", en: "Avg. area" },
    year: { uz: "O'rtacha yil", ru: "Ср. год", en: "Avg. year" },
    uni: { uz: "Universitetlar", ru: "Университеты", en: "Universities" },
    rate: { uz: "O'rtacha reyting", ru: "Ср. рейтинг", en: "Avg. rating" },
    deals: { uz: "Bitimlar", ru: "Сделок", en: "Deals" },
    maxd: { uz: "Maks. chegirma", ru: "Макс. скидка", en: "Max discount" },
    brk: { uz: "Maklerlar", ru: "Маклеров", en: "Brokers" },
    trk: { uz: "Mashinalar", ru: "Машин", en: "Trucks" },
  };
  const lb = (k) => LBL[k][LANG] || LBL[k].uz;
  const PGK = {
    1: "list",
    3: "sale",
    4: "new",
    5: "old",
    6: "vov",
    7: "student",
    8: "brokers",
    9: "delivery",
  };
  const pool = (k) =>
    k == "sale"
      ? P.filter((p) => p.sale)
      : CATS.includes(k)
        ? P.filter((p) => p.cat == k)
        : P;
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  function stats(k) {
    if (k == "brokers")
      return [
        [BROKERS.length, lb("brk")],
        [avg(BROKERS.map((b) => +b.rating)).toFixed(1) + " ★", lb("rate")],
        [BROKERS.reduce((x, b) => x + b.deals, 0), lb("deals")],
      ];
    if (k == "delivery")
      return [
        [DELIVERY.length, lb("trk")],
        ["-" + Math.max(...DELIVERY.map((d) => d.disc)) + "%", lb("maxd")],
        [$$(Math.min(...DELIVERY.map((d) => d.price))), lb("min")],
      ];
    const pl = pool(k),
      pr_ = pl.map((p) => p.price),
      n = pl.length,
      mn = n ? Math.min(...pr_) : 0;
    const A = [$$(Math.round(avg(pr_))), lb("avg")],
      C = [n, lb("cnt")],
      Mn = [$$(mn) + (k == "student" ? t("perMonth") : ""), lb("min")];
    if (k == "sale") {
      const ds = pl
        .filter((p) => p.old)
        .map((p) => Math.round((1 - p.price / p.old) * 100));
      return [C, ["-" + Math.round(avg(ds)) + "%", lb("disc")], Mn];
    }
    if (k == "new" || k == "old")
      return [C, A, [Math.round(avg(pl.map((p) => p.year))), lb("year")]];
    if (k == "vov")
      return [
        C,
        A,
        [Math.round(avg(pl.map((p) => p.area))) + " m²", lb("area")],
      ];
    if (k == "student")
      return [C, Mn, [pl.filter((p) => p.uni).length, lb("uni")]];
    return [C, A, Mn];
  }
  function renderBanner(i) {
    let pb = $("#pb");
    if (!pb) {
      pb = document.createElement("div");
      pb.id = "pb";
      $("#list").insertBefore(pb, $("#lt"));
    }
    const k = PGK[i];
    if (!k) {
      pb.style.display = "none";
      pb.innerHTML = "";
      return;
    }
    pb.style.display = "";
    const [ti, de] = BN[k][LANG] || BN[k].uz;
    const st = stats(k)
      .map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`)
      .join("");
    const ch =
      k == "student"
        ? `<div class="pbch">${pool("student")
            .filter((p) => p.uni)
            .map(
              (p) =>
                `<span class="chip" data-a="uni" data-id="${p.id}">${ic("pin")} ${p.uni.split(" (")[0]}</span>`,
            )
            .join("")}</div>`
        : "";
    pb.innerHTML = `<div class="pbt"><h2>${ti}</h2><p>${de}</p><div class="pbst">${st}</div>${ch}</div><div class="pbs3">${sceneHTML(k)}</div>`;
    watch();
  }
  document.addEventListener("click", (e) => {
    const el = e.target.closest('[data-a="uni"]');
    if (!el) return;
    const p = P.find((x) => x.id == el.dataset.id);
    if (!p) return;
    setQ({ lat: p.lat, lng: p.lng, name: p.uni.split(" (")[0] });
    setTimeout(() => pick(p.id), 700);
  });

  /* ---------- Bosh sahifa: 3D bo'lim kartalari ---------- */
  const CT = [
    [3, "sale"],
    [4, "new"],
    [5, "old"],
    [6, "vov"],
    [7, "student"],
    [8, "brokers"],
    [9, "delivery"],
  ];
  function renderCats() {
    let c = $("#cats");
    if (!c) {
      c = document.createElement("div");
      c.id = "cats";
      $("#hero").insertAdjacentElement("afterend", c);
    }
    c.innerHTML = CT.map(([i, k]) => {
      const n =
        k == "brokers"
          ? BROKERS.length
          : k == "delivery"
            ? DELIVERY.length
            : pool(k).length;
      return `<div class="ct" data-a="nav" data-i="${i}" style="--cc:${COL[k]};--ac:${COL[k]}"><div class="cts">${sceneHTML(k, true)}</div><div><b>${navLabel(i)}</b><span>${n}</span></div></div>`;
    }).join("");
    watch();
  }

  /* ---------- Hero: suzuvchi kublar ---------- */
  function heroInit() {
    if (LOW) return;
    const hero = $("#hero");
    const cubes = [
      [4, 14, 22, 0, "#22b39f"],
      [26, 62, 16, 1.5, "#c17a2e"],
      [52, 12, 14, 3, "#2f7be0"],
      [74, 60, 18, 0.8, "#4fa83a"],
      [92, 16, 20, 2.6, "#d0457a"],
    ];
    hero.insertAdjacentHTML(
      "afterbegin",
      `<div class="hbg"><div class="gr3"></div><div class="fl">${cubes
        .map(
          ([l, tp, s, dl, c]) =>
            `<div class="fcube" style="left:${l}%;top:${tp}%;--dl:${dl}s"><div class="bx" style="--w:${s}px;--h:${s}px;--d:${s}px;--c:${c}"><i class="fr"></i><i class="k"></i><i class="r"></i><i class="l"></i><i class="t"></i></div></div>`,
        )
        .join("")}</div></div>`,
    );
    const flw = hero.querySelector(".fl");
    let raf = 0,
      px = 0,
      py = 0;
    hero.addEventListener(
      "pointermove",
      (e) => {
        const r = hero.getBoundingClientRect();
        px = (e.clientX - r.left) / r.width - 0.5;
        py = (e.clientY - r.top) / r.height - 0.5;
        if (!raf)
          raf = requestAnimationFrame(() => {
            raf = 0;
            flw.style.transform = `rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 14).toFixed(2)}deg)`;
          });
      },
      { passive: true },
    );
  }

  /* ---------- Xaritada 3D binolar ---------- */
  const H0 = {
    Kvartira: 30,
    "Yangi uy": 38,
    "Eski uy": 22,
    Hovli: 16,
    Villa: 20,
  };
  const zk = () => Math.min(1.6, (M.z - 12.6) / 1.4);
  const bh = (p) =>
    M.z < 13.4
      ? 0
      : Math.round(((H0[p.type] || 24) + (p.rooms || 1) * 2) * zk());
  window.bho = (p) => {
    const h = bh(p);
    return h ? h + 6 : 0;
  };
  function drawB() {
    if (M.z < 13.4) return;
    const k = zk();
    fl()
      .map((p) => {
        const [x, y] = sc(p.lat, p.lng);
        return { p, x, y };
      })
      .filter((o) => o.x > -80 && o.x < W + 80 && o.y > -80 && o.y < H + 120)
      .sort((a, b) => a.y - b.y)
      .forEach(({ p, x, y }) => {
        const w = Math.round((p.big ? 28 : 18) * k),
          d = Math.round(w * 0.6),
          h = bh(p),
          c = COL[catOf(p)] || COL.def;
        cx.fillStyle = "rgba(0,0,0,.16)";
        cx.beginPath();
        cx.ellipse(x + d * 0.7, y + 2, w * 0.8, w * 0.25, 0, 0, 7);
        cx.fill();
        cx.fillStyle = c;
        cx.fillRect(x - w / 2, y - h, w, h);
        if (h > 26) {
          cx.fillStyle = "rgba(255,255,255,.5)";
          for (let yy = y - h + 5; yy < y - 6; yy += 8)
            for (let xx = x - w / 2 + 3; xx < x + w / 2 - 4; xx += 7)
              cx.fillRect(xx, yy, 3, 4);
        }
        cx.beginPath();
        cx.moveTo(x + w / 2, y);
        cx.lineTo(x + w / 2 + d, y - d * 0.6);
        cx.lineTo(x + w / 2 + d, y - h - d * 0.6);
        cx.lineTo(x + w / 2, y - h);
        cx.closePath();
        cx.fillStyle = c;
        cx.fill();
        cx.fillStyle = "rgba(0,0,0,.28)";
        cx.fill();
        cx.beginPath();
        cx.moveTo(x - w / 2, y - h);
        cx.lineTo(x + w / 2, y - h);
        cx.lineTo(x + w / 2 + d, y - h - d * 0.6);
        cx.lineTo(x - w / 2 + d, y - h - d * 0.6);
        cx.closePath();
        cx.fillStyle = c;
        cx.fill();
        cx.fillStyle = "rgba(255,255,255,.32)";
        cx.fill();
        if (p.big) {
          cx.beginPath();
          cx.moveTo(x - w / 2 - 2, y - h);
          cx.lineTo(x, y - h - w * 0.45);
          cx.lineTo(x + w / 2 + 2, y - h);
          cx.closePath();
          cx.fillStyle = "rgba(0,0,0,.35)";
          cx.fill();
        }
        if (p.id == S.sel) {
          cx.strokeStyle = "#fff";
          cx.lineWidth = 2;
          cx.strokeRect(x - w / 2, y - h, w, h);
        }
      });
  }

  /* ---------- Mavjud funksiyalarni o'rash ---------- */
  const _draw = draw;
  draw = function () {
    _draw();
    drawB();
  };
  function pageFx(i) {
    const k = PGK[i] || "";
    document.body.dataset.pg = k;
    renderBanner(i);
    const a = $(".app"),
      c = $("#cards");
    a.classList.remove("flip");
    c.classList.remove("anim");
    void a.offsetWidth;
    a.classList.add("flip");
    c.classList.add("anim");
    clearTimeout(pageFx.t);
    pageFx.t = setTimeout(() => {
      a.classList.remove("flip");
      c.classList.remove("anim");
    }, 1100);
  }
  const _setNav = setNav;
  setNav = function (i, keep) {
    _setNav(i, keep);
    pageFx(i);
  };
  const _applyLang = applyLang;
  applyLang = function () {
    _applyLang();
    renderBanner(S.nav);
    renderCats();
  };
  const _openDet = openDet;
  openDet = function (id, nohash) {
    _openDet(id, nohash);
    const p = P.find((x) => x.id == id),
      b = document.querySelector('#det .box[style*="sticky"]');
    if (p && b) {
      b.insertAdjacentHTML(
        "afterbegin",
        `<div class="dsc">${sceneHTML(CATS.includes(p.cat) ? p.cat : "old")}</div>`,
      );
      watch();
    }
  };

  /* ---------- Ishga tushirish ---------- */
  $("#ld").innerHTML = sceneHTML("load", true);
  heroInit();
  renderCats();
  pageFx(S.nav);
  render();
})();
