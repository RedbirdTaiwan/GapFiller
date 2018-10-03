# GapFiller 台灣生物資料空白區域填補活動網站模版
## 簡介
為鼓勵公民科學家至生物資料缺乏區域（冷點）進行補充調查而製作之活動網站，在補充調查活動開始前，可由網站發佈冷點位置訊息；於活動開始後，可展示調查成果之即時資訊。
## 緣起
本網站是配合[eBird Taiwan](https://ebird.org/taiwan/home)[秋季月挑戰](https://ebird.org/taiwan/news/ebird-taiwan-%E7%A7%8B%E5%AD%A3%E6%9C%88%E6%8C%91%E6%88%B0)所設計製作。該活動於2018年9月間，鼓勵民眾至冷點進行鳥類調查，活動結束後並提供獎品獎勵資料貢獻者。
## 作者
* 前端技術：吳世鴻
* 美術設計：羅祈鈞
## 功能
1. 活動開始前，以網格圖層顯示冷點位置，方便活動參與者規劃調查路線與計畫。
2. 活動開始後，可透過網站定位及Google導航功能，指引活動參與者抵達目標調查區。
3. 活動期間，定時將已有觀察紀錄的冷點於地圖上標上旗幟，並統計總旗幟數、累計已有資料之網格比例，以及活動參與者之插旗數。
4. 自適應網頁，適合各種銀幕尺寸瀏覽。
## 組件
* 網站版型：[Bootstrap SB Admin 2](https://startbootstrap.com/template-overviews/sb-admin-2/)
* 地圖函式庫：[Leaflet](https://leafletjs.com/)、[Esri Leaflet](https://esri.github.io/esri-leaflet/)、[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
* 圖表函式庫：[D3.js](https://d3js.org/)、[Simple bar graph in v4](https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4)
* 字型：[王漢中細黑體](http://lms.ltu.edu.tw/course_open.php?courseID=12961&f=open_doc&cid=684505)
## 使用說明
1. 準備可執行html5、css、JavaScript的網站伺服器。
2. 將website資料夾下所有檔案及資料夾複製至網站伺服器。
3. /index.html: 修改網站標題、連結、圖示等活動資訊。
4. /js/gapfiller.js: 設定基本參數。
5. /data/WGS84Grid.js: 網格基礎資料，參考[TWGrid-WGS84](https://github.com/RedbirdTaiwan/TWGrid-WGS84)將現有生物資料筆數整理成以網格單位之統計資料，筆數為0者即為冷點網格。
6. /data/ebirder.js: 活動參與者插旗統計資料，定時將活動結果計算出每位活動參與者的插旗數並更新本檔。
7. /data/flag.js: 插旗座標及相關資訊之geojson檔，定時將活動結果計算出成功插旗之網格中心點座標(coordinates)、插旗人員名稱(name)、觀察時間(time)並更新本檔。
8. /data/teamcolor.js: 旗標檔，可設定每個參與者的個人專屬旗標圖示，圖示檔儲存於/images/，預設圖示為flagR.png。