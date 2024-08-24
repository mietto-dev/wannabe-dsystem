function StatusOfLRBtnOf3MenuHandle(nowScrollLocation) {
  if (nowScrollLocation == "") {
    nowScrollLocation = 0;
  }
  var class3MenuContainerWidth = $("#class3MenuMainContent").width();
  var totalTabWidth = $("#_totalTabWidth").val();
  if (nowScrollLocation >= totalTabWidth - class3MenuContainerWidth) {
    $("#scrollRightBtn").attr("class", "scrollRightBtnDisable");
    $("#scrollLeftBtn").attr("class", "scrollLeftBtn EnableScrollBtn");
  } else if (nowScrollLocation == 0) {
    $("#scrollLeftBtn").attr("class", "scrollLeftBtnDisable");
    $("#scrollRightBtn").attr("class", "scrollRightBtn EnableScrollBtn");
  } else {
    $("#scrollRightBtn").attr("class", "scrollRightBtn EnableScrollBtn");
    $("#scrollLeftBtn").attr("class", "scrollLeftBtn EnableScrollBtn");
  }
}

function Menu3TabStyleHandle() {
  var class3MenuContainer = $("#class3MenuMainContent");
  var ContainerWidth =
    $("#commRight").width() -
    $("#scrollLeftBtn").width() -
    $("#scrollRightBtn").width();
  class3MenuContainer.width(ContainerWidth);
  var tabTotalWidth = 0;
  var tab = $("li", class3MenuContainer);
  for (var i = 0; i < tab.length; i++) {
    var LiWidth = parseInt(tab[i].offsetWidth);
    tabTotalWidth = tabTotalWidth + LiWidth;
  }
  $("#_totalTabWidth").val(tabTotalWidth);
  var class3MenuUl = $("ul", class3MenuContainer);
  if (tabTotalWidth > ContainerWidth) {
    class3MenuUl.css("width", 5000);
    $("#scrollLeftBtn,#scrollRightBtn").addClass("EnableScrollBtn");
    var nowScrollLocation = $("#_Menu3Location").text();
    if (tabTotalWidth - ContainerWidth < nowScrollLocation) {
      nowScrollLocation = tabTotalWidth - ContainerWidth;
    }
    class3MenuContainer.scrollLeft(nowScrollLocation);
    StatusOfLRBtnOf3MenuHandle(nowScrollLocation);
  } else {
    $("#scrollLeftBtn").removeClass("scrollLeftBtn");
    $("#scrollRightBtn").removeClass("scrollRightBtn");
  }
}

function MenuItemClass(menuItemJSON) {
  this.menuItemJSON = menuItemJSON;
}

MenuItemClass.prototype.findMenu = function (menuid) {
  var menuItemJSON = this.menuItemJSON;
  var menuItemId = menuItemJSON.id;
  if (menuItemId == menuid) {
    return menuItemJSON;
  }
  var children = menuItemJSON.children;
  if (!children) {
    return null;
  }
  for (var i = 0; i < children.length; i++) {
    var childItem = children[i];
    var childID = childItem.id;
    if (menuid == childID) {
      return childItem;
    }
    if (childItem.children) {
      var childObj = new MenuItemClass(childItem);
      var targetMenu = childObj.findMenu(menuid);
      if (targetMenu) {
        return targetMenu;
      }
    }
  }
  return null;
};

MenuItemClass.prototype.getLeftMostPageJSON = function () {
  var menuItemJSON = this.menuItemJSON;
  var menuItemId = menuItemJSON;
  var children = menuItemJSON.children;
  if (!children) {
    return menuItemJSON;
  }
  var leftMostSon = children[0];
  var menuObj = new MenuItemClass(leftMostSon);
  return menuObj.getLeftMostPageJSON();
};
function MenuTreeClass(menuTreeJSON) {
  this.menuTreeJSON = menuTreeJSON;
}

MenuTreeClass.prototype.findMenu = function (menuid) {
  var menuTreeJSON = this.menuTreeJSON;
  for (var i = 0; i < menuTreeJSON.length; i++) {
    var menu1table = menuTreeJSON[i];
    var menu1Obj = new MenuItemClass(menu1table);
    var targetMenu = menu1Obj.findMenu(menuid);
    if (targetMenu) {
      return targetMenu;
    }
  }
  return null;
};
function GetLeftMostPageID(menuid) {
  var menuTable = menuTreeObj.findMenu(menuid);
  var menuObj = new MenuItemClass(menuTable);
  var pageJSON = menuObj.getLeftMostPageJSON();
  return pageJSON.id;
}
function Class3MenuShow(selectPageID, selectSupId, selectMidId, selectThdId) {
  if (selectThdId == "") {
    $("#class3Menu").css("display", "none");
    return;
  }
  var class2MenuNode = menuTreeObj.findMenu(selectMidId);
  var class3MenuJSON = class2MenuNode.children;
  var class3MenuContent = "";
  for (var index in class3MenuJSON) {
    var menu = class3MenuJSON[index];
    var class3MenuID = menu.id;
    var class3MenuName = menu.name;
    if (class3MenuID == selectThdId) {
      AEleMenu3Class = "AEleMenu3Selected";
    } else {
      AEleMenu3Class = "AEleMenu3";
    }
    class3MenuContent =
      class3MenuContent +
      "<li><p class='" +
      AEleMenu3Class +
      "'" +
      "MenuClass='3'" +
      "id='" +
      class3MenuID +
      "'" +
      "MenuPage='" +
      GetLeftMostPageID(class3MenuID) +
      "'" +
      "href='#" +
      class3MenuID +
      "'>" +
      class3MenuName +
      "</p></li>";
  }
  $("#class3MenuMainContent ul").html(class3MenuContent);
  $("#class3MenuMainContent ul li p").click(function () {
    var MenuOBJ = $(this);
    if (!checkDisClickAttr(MenuOBJ)) {
      return;
    }
    AjaxQuery_ClassMenuClick(MenuOBJ);
  });
  Menu3TabStyleHandle();
  $(window).resize(function () {
    Menu3TabStyleHandle();
  });
  $("#scrollRightBtn,#scrollLeftBtn").click(function () {
    if (!$(this).hasClass("EnableScrollBtn")) {
      consoleLog("no scroll button!!");
      return;
    }
    var scrollTarget = $("#class3MenuMainContent");
    var tabWidth = $("#_totalTabWidth").val();
    var srcollTotalLen = tabWidth - scrollTarget.width();
    if ($(this).attr("id") == "scrollLeftBtn") {
      scrollTarget.scrollLeft(0);
    } else {
      scrollTarget.scrollLeft(srcollTotalLen);
    }
    var afterPosition = scrollTarget.scrollLeft();
    StatusOfLRBtnOf3MenuHandle(afterPosition);
  });
}
function Class2MenuShow(selectPageID, selectSupId, selectMidId) {
  if (selectMidId == "") {
    return;
  }
  var class1MenuNode = menuTreeObj.findMenu(selectSupId);
  var class2MenuJSON = class1MenuNode.children;
  var class2MenuContent = "";
  var class2MenuClass = "";
  for (var index in class2MenuJSON) {
    var menu = class2MenuJSON[index];
    var class2MenuID = menu.id;
    var class2MenuName = menu.name;
    if (class2MenuID == selectMidId) {
      class2MenuClass = "selectClass2Menu";
    } else {
      class2MenuClass = "";
    }
    class2MenuContent =
      class2MenuContent +
      "<li>" +
      "<a class='" +
      class2MenuClass +
      "' " +
      "href='javascript:void(0);' " +
      "MenuClass='2' " +
      "id='" +
      class2MenuID +
      "' " +
      "MenuPage='" +
      GetLeftMostPageID(class2MenuID) +
      "' title='" +
      class2MenuName +
      "'>" +
      class2MenuName +
      "</a></li>";
  }
  $("#class2MenuItem").html(class2MenuContent);
  $("#class2MenuItem li a").click(function () {
    var MenuOBJ = $(this);
    if (!checkDisClickAttr(MenuOBJ)) {
      return;
    }
    AjaxQuery_ClassMenuClick(MenuOBJ);
  });
}
function Class1MenuShow(selectPageID, selectSupId) {
  var FirstMenuContent = "<ul>";
  var SupClass = "";
  var SupLiID = "";
  var FirstOne = "yes";
  var navBarWidth = $("#mainNavigator").width();
  var leftPadWidth = $("#mn_first").width();
  var rightPadWidth = $("#mn_last").width();
  var menuAreaWidth = navBarWidth - leftPadWidth - rightPadWidth;
  menuAreaWidth -= 7;
  var menuWidth = menuAreaWidth / menuTreeJSON.length;
  menuWidth = Math.floor(menuWidth);
  for (var index in menuTreeJSON) {
    var menu = menuTreeJSON[index];
    var supId = menu.id;
    var supName = menu.name;
    if (supId == selectSupId) {
      SupClass = "SelectMenuItem";
    } else {
      SupClass = "MenuItem";
    }
    if (FirstOne == "yes") {
      SupLiID = "homeLi";
      FirstOne = "no";
    } else {
      SupLiID = "";
    }
    FirstMenuContent =
      FirstMenuContent +
      '<li id="' +
      SupLiID +
      '">' +
      '<a href="javascript:void(0);" class="' +
      SupClass +
      '" ' +
      "style='width:" +
      menuWidth +
      "px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;' " +
      "MenuClass='1' " +
      "id='" +
      supId +
      "' " +
      "MenuPage='" +
      GetLeftMostPageID(supId) +
      "'" +
      " title='" +
      supName +
      "'>" +
      supName +
      "</a></li>";
  }
  FirstMenuContent = FirstMenuContent + "</ul>";
  $("#mn_li").html(FirstMenuContent);
  $("#mn_li li a").click(function () {
    var MenuOBJ = $(this);
    if (!checkDisClickAttr(MenuOBJ)) {
      return;
    }
    AjaxQuery_ClassMenuClick(MenuOBJ);
  });
}
function checkDisClickAttr(obj) {
  if ("off" == obj.attr("EnableClick")) {
    return false;
  }
  handleDisClickAttr("off");
  return true;
}
function handleDisClickAttr(ret) {
  var selectSupId = $("#_NowSupIdInfo", _MenuInfo).text();
  var selectMidId = $("#_NowMidIdInfo", _MenuInfo).text();
  var selectThdId = $("#_NowThdIdInfo", _MenuInfo).text();
  if (selectThdId) {
    var objs = [
      $("#" + selectSupId),
      $("#" + selectMidId),
      $("#" + selectThdId),
    ];
  } else {
    if (selectMidId) {
      var objs = [$("#" + selectSupId), $("#" + selectMidId)];
    } else {
      var objs = [$("#" + selectSupId)];
    }
  }
  for (var i = 0; i < objs.length; i++) {
    if (objs[i].length > 0) {
      objs[i].attr("EnableClick", ret);
    }
  }
}
function AjaxPageGet(PageName, MenuClass) {
  var pageContainer = $("#commPageContainer");
  pageContainer.succfunction = function (html) {
    pageContainer.html(html);
    var _MenuInfo = $("#_MenuInfo");
    var selectPageID = $("#_NextPageInfo", _MenuInfo).text();
    var selectSupId = $("#_NowSupIdInfo", _MenuInfo).text();
    var selectMidId = $("#_NowMidIdInfo", _MenuInfo).text();
    var selectThdId = $("#_NowThdIdInfo", _MenuInfo).text();
    if ("mmHome" == selectPageID) {
      $(document).scrollTop(0);
      return;
    }
    if (MenuClass == "1") {
      Class1MenuShow(selectPageID, selectSupId);
    }
    Class2MenuShow(selectPageID, selectSupId, selectMidId);
    Class3MenuShow(selectPageID, selectSupId, selectMidId, selectThdId);
    $(document).scrollTop(0);
    handleDisClickAttr("on");
  };
  pageContainer.errorfunction = function () {
    consoleLog("page get fail");
    showWaitTip(false);
    pageContainer.html("Pedido da página falhou, por favor tente novamente!");
    handleDisClickAttr("on");
  };
  showWaitTip(true);
  pageContainer.dataTransfer(
    PageName,
    "GET",
    pageContainer.succfunction,
    pageContainer.errorfunction,
    false,
    undefined,
    "html"
  );
}
function AjaxQuery_ClassMenuClick(MenuOBJ) {
  var MenuClass = MenuOBJ.attr("MenuClass");
  var page = MenuOBJ.attr("MenuPage");
  var scrollTarget = $("#class3MenuMainContent");
  var Menu3Location = scrollTarget.scrollLeft();
  var pageFile = "/?_type=menuView&_tag=" + page + "&Menu3Location=0";
  if (MenuClass == 3) {
    pageFile =
      "/?_type=menuView&_tag=" + page + "&Menu3Location=" + Menu3Location;
  }
  AjaxPageGet(pageFile, MenuClass);
}
function openLink(pageurl) {
  var PageName = "/?_type=menuView&_tag=" + pageurl;
  AjaxPageGet(PageName, 1);
}
function MenuShow(
  Menuclass,
  selectPageID,
  selectSupId,
  selectMidId,
  selectThdId
) {
  if (Menuclass == "ClassAll") {
    Class1MenuShow(selectPageID, selectSupId);
    Class2MenuShow(selectPageID, selectSupId, selectMidId);
    Class3MenuShow(selectPageID, selectSupId, selectMidId, selectThdId);
  } else if (Menuclass == "ClassOne") {
    Class1MenuShow(selectPageID, selectSupId);
  } else if (Menuclass == "ClassTwo") {
    Class2MenuShow(selectPageID, selectSupId);
  } else {
    consoleLog(
      "[menu_api.lp][MenuShow]    Menuclass(" +
        Menuclass +
        "filling is not right!!"
    );
  }
}
function FakeClass1MenuShow() {
  var FirstMenuContent = "<ul>";
  var SupClass = "MenuItem";
  var SupLiID = "";
  var FirstOne = "yes";
  var navBarWidth = $("#mainNavigator").width();
  var leftPadWidth = $("#mn_first").width();
  var rightPadWidth = $("#mn_last").width();
  var menuAreaWidth = navBarWidth - leftPadWidth - rightPadWidth;
  menuAreaWidth -= 7;
  var menuWidth = menuAreaWidth / menuTreeJSON.length;
  menuWidth = Math.floor(menuWidth);
  for (var index in menuTreeJSON) {
    var menu = menuTreeJSON[index];
    var supId = menu.id;
    var supName = menu.name;
    if (FirstOne == "yes") {
      SupLiID = "homeLi";
      FirstOne = "no";
    } else {
      SupLiID = "";
    }
    FirstMenuContent =
      FirstMenuContent +
      '<li id="' +
      SupLiID +
      '">' +
      '<a href="javascript:void(0);" class="' +
      SupClass +
      '" ' +
      "style='width:" +
      menuWidth +
      "px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; " +
      "color:#BFBDBE; cursor:default;'" +
      ' hidefocus="true" onclick=" " title="' +
      supName +
      '">' +
      supName +
      "</a></li>";
  }
  FirstMenuContent = FirstMenuContent + "</ul>";
  $("#mn_li").html(FirstMenuContent);
}
function showWaitTip(show, TipMsg, StopTag) {
  var TipMsgTmp = TipMsg;
  if (show) {
    $("#blackMask,#tipLayer,#confirmBtnArea").css("display", "block");
    if (TipMsgTmp == undefined || TipMsgTmp == "") {
      $("#waitingImgArea").css("display", "none");
      if (true == StopTag) {
        $("#confirmStop").css("display", "block");
        $("#confirmCancel,#confirmOK").css("display", "none");
      } else {
        $("#confirmStop").css("display", "none");
        $("#confirmCancel,#confirmOK").css("display", "block");
      }
    } else {
      $("#confirmLayer, #waitingImgArea").css("display", "block");
      $("#confirmMsg p").text(TipMsgTmp);
      if (true == StopTag) {
        $("#confirmStop").css("display", "block");
        $("#confirmCancel,#confirmOK").css("display", "none");
      } else {
        $("#confirmCancel,#confirmOK,#confirmStop").css("display", "none");
      }
    }
    reposition_box("tipLayer");
  } else {
    $("#blackMask, #tipLayer, #confirmLayer").css("display", "none");
  }
}
function IniConfirm(msg) {
  showWaitTip(true);
  var confirmLayerOBJ = $("#confirmLayer");
  confirmLayerOBJ.css("display", "block");
  $("#confirmMsg p", confirmLayerOBJ).text(msg);
  $("#confirmCancel", confirmLayerOBJ).unbind("click");
  $("#confirmOK", confirmLayerOBJ).unbind("click");
  $("#confirmStop", confirmLayerOBJ).unbind("click");
  $("#confirmCancel", confirmLayerOBJ).bind("click", function (event) {
    showWaitTip(false);
  });
  $("#confirmCancel", confirmLayerOBJ).focus();
  return confirmLayerOBJ;
}
function IniTip(msg, infoType) {
  showWaitTip(true);
  var confirmLayerOBJ = $("#confirmLayer");
  $("#confirmCancel", confirmLayerOBJ).css("display", "none");
  confirmLayerOBJ.css("display", "block");
  if (infoType == "err") {
    $("#confirmMsg", confirmLayerOBJ).css(
      "background",
      'url("../img/err_m.png") no-repeat 20px 50%'
    );
  } else if (infoType == "succ") {
    $("#confirmMsg", confirmLayerOBJ).css(
      "background",
      'url("../img/succ_m.png") no-repeat 20px 50%'
    );
  } else {
    $("#confirmMsg", confirmLayerOBJ).css(
      "background",
      'url("../img/info_m.png") no-repeat 20px 50%'
    );
  }
  $("#confirmMsg p", confirmLayerOBJ).text(msg);
  $("#confirmCancel", confirmLayerOBJ).unbind("click");
  $("#confirmOK", confirmLayerOBJ).unbind("click");
  $("#confirmStop", confirmLayerOBJ).unbind("click");
  $("#confirmOK", confirmLayerOBJ).bind("click", function (event) {
    showWaitTip(false);
    $("#confirmMsg", confirmLayerOBJ).css(
      "background",
      'url("../img/info_m.png") no-repeat 20px 50%'
    );
  });
  $("#confirmOK", confirmLayerOBJ).focus();
  return confirmLayerOBJ;
}
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return document.defaultView.getComputedStyle(obj, null)[attr];
  }
}
function reposition_box(divId) {
  var box = document.getElementById(divId);
  if (null != box) {
    var boxObj = $("#" + divId);
    var winH = $(window).height();
    var winW = $(window).width();
    var divH = boxObj.height();
    var divW = boxObj.width();
    var h = (winH - divH) / 2;
    h = h > 0 ? h : 5;
    var w = (winW - divW) / 2;
    w = w > 0 ? w : 5;
    boxObj.css({ top: h, left: w });
    if (divH > winH || divW > winW) {
      boxObj.css("position", "absolute");
    } else {
      boxObj.css("position", "fixed");
    }
  }
}
$.validator.setDefaults({
  errorPlacement: function (error, element) {
    var tipHTML = '<div class="errorLabelWraper"></div>';
    var tipObj = $(tipHTML);
    error.appendTo(tipObj);
    var rowObj = element.closest(".row");
    if (rowObj.length == 0) {
      consoleLog("element id=[" + element.attr("id") + "] is not in row div.");
      return;
    }
    var rowWidth = rowObj.width();
    var usedWidth = 0;
    var rightObj = undefined;
    rowObj.children().each(function () {
      if (
        !(
          $(this).hasClass("_LuQUID_AccessDeviceList") ||
          $(this).hasClass("clear")
        )
      ) {
        usedWidth += $(this).outerWidth(true);
      }
      if ($(this).hasClass("right")) {
        rightObj = $(this);
      }
    });
    var errWidth = rowWidth - usedWidth;
    var widthtmp = errWidth - 5 - 23 - 10;
    if (widthtmp < 1) {
      tipObj.removeAttr("style", "");
    } else {
      tipObj.width(widthtmp);
    }
    if (rightObj != undefined) {
      tipObj.insertAfter(rightObj);
    } else {
      tipObj.appendTo(rowObj);
    }
  },
});
jQuery.extend(jQuery.validator.messages, {
  required: "Este campo é obrigatório. ",
  remote: "Por favor corrigir esse campo. ",
  email: "Por favor insira um endereço de e-mail válido. ",
  url: "Por favor, insira um URL válido. ",
  date: "Por favor insira uma data válida. ",
  dateISO: "Por favor, indique uma data válida (ISO). ",
  number: "Por favor insira um número válido. ",
  digits: "Digite um número inteiro. ",
  creditcard: "Por favor digite um número de cartão de crédito válido. ",
  equalTo: "Por favor entre com o mesmo valor novamente. ",
  maxlength: jQuery.validator.format(
    "Por favor, indique não mais do que {0} caracteres. "
  ),
  minlength: jQuery.validator.format(
    "Por favor, insira pelo menos {0} caracteres. "
  ),
  rangelength: jQuery.validator.format(
    "Por favor insira um valor com {0} ~ {1} caracteres. "
  ),
  range: jQuery.validator.format("Por favor insira um valor entre {0} e {1}. "),
  max: jQuery.validator.format(
    "Por favor insira um valor menor ou igual a {0}. "
  ),
  min: jQuery.validator.format(
    "Por favor insira um valor maior ou igual a {0}. "
  ),
});
function AsciiPasswordCheck(Key) {
  for (var j = 0; j < Key.length; j++) {
    var ch = Key.charCodeAt(j);
    if (ch == 9) {
      return false;
    }
  }
  return true;
}
function AsciiCheck(Key) {
  for (var j = 0; j < Key.length; j++) {
    var ch = Key.charCodeAt(j);
    if (ch < 32 || ch > 126) {
      return false;
    }
  }
  return true;
}
function AsciiCheckWithLen(Key, LenLimit) {
  if (Key.length != LenLimit) {
    return false;
  }
  if (false == AsciiCheck(Key)) {
    return false;
  }
  return true;
}
function HexCheck(Key) {
  for (var j = 0; j < Key.length; j++) {
    var ch = Key.charCodeAt(j);
    if (
      !(
        (ch >= 65 && ch <= 70) ||
        (ch >= 97 && ch <= 102) ||
        (ch >= 48 && ch <= 57)
      )
    ) {
      return false;
    }
  }
  return true;
}
function HexCheckWithLen(Key, LenLimit) {
  if (Key.length != LenLimit) {
    return false;
  }
  if (false == HexCheck(Key)) {
    return false;
  }
  return true;
}
function checkDomain(value) {
  var len = value.length;
  var firstChar = value.substr(0, 1);
  var lastChar = value.substr(len - 1, 1);
  var maxlen = 64;
  if (len > 64 || len < 1) {
    return false;
  }
  if (value.match("[^0-9a-zA-Z.-]") != null) {
    return false;
  }
  if (firstChar.match("[^0-9a-zA-Z]") != null) {
    return false;
  }
  if (lastChar.match("[^0-9a-zA-Z]") != null) {
    return false;
  }
  var pos = value.lastIndexOf(".");
  if (pos == -1) {
    var str = value;
    var templen = value.length;
    for (var i = 0; i < len; i++) {
      var tempvalue = str.substring(i, i + 1);
      if (isNaN(parseInt(tempvalue))) {
        return true;
      }
    }
    return false;
  } else {
    var str = value.substr(pos + 1);
    var tmplen = value.length - (pos + 1);
    for (var i = 0; i < tmplen; i++) {
      var tmpvalue = str.substring(i, i + 1);
      if (isNaN(parseInt(tmpvalue))) {
        return true;
      }
    }
    return false;
  }
}
function checkIPv4Addr(ipaddr) {
  var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (re.test(ipaddr) == true) {
    var parts = ipaddr.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].indexOf("0") == 0 && parts[i].length > 1) return false;
      if (parseInt(parts[i], 10) > 255 || parseInt(parts[i], 10) < 0) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function checkIPv6Addr(ipaddr) {
  if (ipaddr.match("[^0-9a-fA-F:.]") != null) return false;
  var addrParts = ipaddr.split(":");
  var Doublecolon = ipaddr.split("::");
  var ipv4Parts = ipaddr.split(".");
  if (addrParts.length < 3 || addrParts.length > 8) {
    return false;
  } else if (
    Doublecolon.length == 1 &&
    ipv4Parts.length == 1 &&
    addrParts.length != 8
  ) {
    return false;
  } else if (
    Doublecolon.length == 1 &&
    ipv4Parts.length > 1 &&
    addrParts.length != 6
  ) {
    return false;
  } else if (
    Doublecolon.length > 1 &&
    ipv4Parts.length > 1 &&
    addrParts.length > 6
  ) {
    return false;
  } else if (Doublecolon.length > 2 || ipaddr.split(":::").length > 1) {
    return false;
  } else {
    if (addrParts[0] == "" && addrParts[1] != "") {
      return false;
    }
    for (var i = 0; i < addrParts.length; i++) {
      if (
        i == addrParts.length - 1 &&
        addrParts[i] == "" &&
        addrParts[i - 1] != ""
      ) {
        return false;
      }
      if (addrParts[i].length > 4 && addrParts[i].split(".").length < 2) {
        return false;
      }
    }
  }
  var pos = ipaddr.lastIndexOf(":");
  var ipv4Parts = ipaddr.split(".");
  if (ipv4Parts.length > 1) {
    var ipv4 = ipaddr.substring(pos + 1, ipaddr.length);
    if (false == checkIPv4Addr(ipv4)) {
      return false;
    }
  }
  return true;
}
function checkMacAddr(macaddr) {
  var regSingleByte = new RegExp(":", "g");
  var regexp = /^([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}$/;
  macaddr = macaddr.replace(regSingleByte, "-");
  if (!regexp.test(macaddr)) {
    return false;
  }
  return true;
}
jQuery.validator.addMethod(
  "macAddr",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (checkMacAddr(value) == true) {
      return true;
    }
    return false;
  },
  "Insira um endereço MAC válido. "
);
jQuery.validator.addMethod(
  "IPv4Addr",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (checkIPv4Addr(value) == true) {
      return true;
    }
    return false;
  },
  "Insira um endereço IPv4 válido. "
);
jQuery.validator.addMethod(
  "IPv6Addr",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    return checkIPv6Addr(value);
  },
  "Insira um endereço IPv6 válido. "
);
jQuery.validator.addMethod(
  "DomainName",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    return checkDomain(value);
  },
  "Por favor insira um nome de domínio válido. "
);
jQuery.validator.addMethod(
  "HostName",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    var len = value.length;
    var firstChar = value.substr(0, 1);
    var lastChar = value.substr(len - 1, 1);
    if (value.match("[^0-9a-zA-Z.-]") != null) {
      return false;
    }
    if (firstChar.match("[^0-9a-zA-Z]") != null) {
      return false;
    }
    if (lastChar.match("[^0-9a-zA-Z]") != null) {
      return false;
    }
    var pos = value.lastIndexOf(".");
    if (pos == -1) {
      var str = value;
      var templen = value.length;
      for (var i = 0; i < len; i++) {
        var tempvalue = str.substring(i, i + 1);
        if (isNaN(parseInt(tempvalue))) {
          return true;
        }
      }
      return false;
    } else {
      var str = value.substr(pos + 1);
      var tmplen = value.length - (pos + 1);
      for (var i = 0; i < tmplen; i++) {
        var tmpvalue = str.substring(i, i + 1);
        if (isNaN(parseInt(tmpvalue))) {
          return true;
        }
      }
      return false;
    }
  },
  "Por favor insira um nome de host válido. "
);
jQuery.validator.addMethod(
  "url",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    var len = value.length;
    if (len < 1 || len > 256) {
      return false;
    }
    if (value.match("[^0-9a-zA-Z.:;,!@%#?_/&=+*'$()\\[\\]-]") != null) {
      return false;
    }
    return true;
  },
  "Por favor, insira um URL válido. "
);
jQuery.validator.addMethod(
  "PasswordASCII",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (value == "						") {
      return true;
    }
    if (false == AsciiPasswordCheck(value)) {
      params = 0;
      return false;
    }
    if (false == AsciiCheck(value)) {
      params = 1;
      return false;
    }
    return true;
  },
  function (param, element) {
    var error = [
      "O formato da senha está errada. Por favor, digite novamente. ",
      "Por favor, indique apenas caracteres ASCII. ",
    ];
    var value = $(element).val();
    var ret = 0;
    if (false == AsciiPasswordCheck(value)) {
      ret = 0;
    } else if (false == AsciiCheck(value)) {
      ret = 1;
    } else {
    }
    if (ret <= error.length) {
      return error[ret];
    }
  }
);
jQuery.validator.addMethod(
  "ASCII",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (false == AsciiCheck(value)) {
      return false;
    }
    return true;
  },
  "Por favor, indique apenas caracteres ASCII. "
);
jQuery.validator.addMethod(
  "PassStrong",
  function (value, element, params) {
    var num = 0;
    for (var j = 0; j < value.length; j++) {
      var ch = value.charCodeAt(j);
      if (ch < 32 || ch > 126) {
        return false;
      }
    }
    if (value.length < 8) return false;
    if (/[0-9]+/.test(value)) num = num + 1;
    if (/[a-z]+/.test(value)) num = num + 1;
    if (/[A-Z]+/.test(value)) num = num + 1;
    if (/[!"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]+/.test(value)) num = num + 1;
    if (num < 3) return false;
    return true;
  },
  "Please enter a strong password!"
);
jQuery.validator.addMethod(
  "utf8",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    return true;
  },
  "Por favor, indique apenas caracteres ASCII. "
);
jQuery.validator.addMethod(
  "WEPKey128Bit",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    var AsciiLenLimit = 13;
    var HexLenLimit = 26;
    if (
      AsciiCheckWithLen(value, AsciiLenLimit) == false &&
      HexCheckWithLen(value, HexLenLimit) == false
    ) {
      return false;
    }
    return true;
  },
  "Por favor insira 13 caracteres ASCII ou 26 dígitos hexadecimais. "
);
jQuery.validator.addMethod(
  "WEPAsciiOrHexLen",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    var AsciiLenLimit = 5;
    var HexLenLimit = 10;
    var AsciiLenLimit13 = 13;
    var HexLenLimit26 = 26;
    if (
      AsciiCheckWithLen(value, AsciiLenLimit) == false &&
      HexCheckWithLen(value, HexLenLimit) == false &&
      AsciiCheckWithLen(value, AsciiLenLimit13) == false &&
      HexCheckWithLen(value, HexLenLimit26) == false
    ) {
      return false;
    }
    return true;
  },
  "Por favor, digite 5 ou 13 caracteres ASCII, ou digite 10 ou 26 dígitos hexadecimais. "
);
jQuery.validator.addMethod(
  "HEX",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (HexCheck(value) == false) {
      return false;
    }
    return true;
  },
  "Introduza apenas caracteres hexadecimais. "
);
jQuery.validator.addMethod(
  "fixedlength",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (value.length != param) {
      return false;
    }
    return true;
  },
  jQuery.validator.format("Por favor, indique {0} caracteres. ")
);
jQuery.validator.addMethod(
  "fixedValue",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (value != param) {
      return false;
    }
    return true;
  },
  jQuery.validator.format("O único valor permitido é {0}.")
);
function hexCompare(hexNum, hexRefer) {
  var num = parseInt(hexNum, 16);
  var refer = parseInt(hexRefer, 16);
  if (num < refer) {
    return -1;
  } else if (num > refer) {
    return 1;
  } else {
    return 0;
  }
}
jQuery.validator.addMethod(
  "hexRange",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (typeof params[0] == "object") {
      for (var i = 0; i < params.length; i++) {
        var range = params[i];
        if (typeof range == "object") {
          if (
            hexCompare(value, range[0]) != -1 &&
            hexCompare(value, range[1]) != 1
          ) {
            return true;
          }
        }
      }
    } else {
      if (
        hexCompare(value, params[0]) != -1 &&
        hexCompare(value, params[1]) != 1
      ) {
        return true;
      }
    }
    return false;
  },
  function (params, element) {
    var rangesStr = "";
    if (typeof params[0] == "object") {
      var rangesLen = params.length;
      for (var i = 0; i < rangesLen; i++) {
        var range = params[i];
        if (hexCompare(range[0], range[1]) != 0) {
          rangesStr += range[0] + "~" + range[1];
        } else {
          rangesStr += range[0];
        }
        if (i < rangesLen - 1) {
          rangesStr += ", ";
        }
      }
    } else {
      rangesStr = params[0] + "~" + params[1];
    }
    return $.validator.format(
      "Por favor insira um valor hexadecimal em intervalos de {0}. ",
      rangesStr
    );
  }
);
jQuery.validator.addMethod(
  "ranges",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    var rangesLen = param.length;
    for (var i = 0; i < rangesLen; i++) {
      var range = param[i];
      if (typeof range === "number") {
        if (value == range) {
          return true;
        }
      } else {
        if (value >= range[0] && value <= range[1]) {
          return true;
        }
      }
    }
    return false;
  },
  function (param, element) {
    var rangesStr = "";
    var rangesLen = param.length;
    for (var i = 0; i < rangesLen; i++) {
      var range = param[i];
      if (typeof range === "number") {
        rangesStr += range;
      } else {
        rangesStr += range[0] + "~" + range[1];
      }
      if (i < rangesLen - 1) {
        rangesStr += ",";
      }
    }
    return $.validator.format(
      "Por favor insira um valor em intervalos de {0}. ",
      rangesStr
    );
  }
);
jQuery.validator.addMethod(
  "integer",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    return /^-?\d+$/.test(value);
  },
  "Digite um número inteiro. "
);
jQuery.validator.addMethod(
  "concurrence",
  function (value, element, param) {
    if (1 > param.length) {
      return true;
    }
    var obj = get_element_obj($(element), param[0]);
    if (obj.is(":hidden")) {
      return true;
    }
    if ("" == value && "" == obj.val()) {
      return true;
    }
    if ("" != value && "" != obj.val()) {
      return true;
    }
    return false;
  },
  "Por favor coloque prefixo válido. "
);
function get_element_obj(obj, id) {
  var instTplt = obj.closest("[id^=template_]");
  var elementID = obj.attr("id");
  var arr = elementID.split(":");
  var strId = id;
  if (arr.length > 1) {
    var exNum = arr[arr.length - 1];
    strId = id + ":" + exNum;
  }
  return $("[id^='" + strId + "']", instTplt);
}
function test_greatThan(obj, value, param, type) {
  if ("errstring" == type) {
    var tempstring = {
      1: param[2].separate
        ? 'Por favor, indique um valor superior a "{0}". '
        : "Por favor insira um valor maior do que o anterior. ",
      2: param[2].separate
        ? 'Por favor insira um valor não inferior a "{0}". '
        : "Por favor insira um valor não inferior ao primeiro. ",
      3: param[2].separate
        ? "Assegure-se de que a diferença com o primeiro não seja maior que {1}. "
        : "Assegure-se de que a diferença com o primeiro não seja maior que {1}. ",
    };
    return $.validator.format(
      tempstring[param[2].ret],
      param[2].idtext,
      param[2].discrepantMode
    );
  } else {
    var tmpvalue = obj.val();
    var ret = true;
    if (param[2].equal) {
      ret = Number(value) >= Number(tmpvalue);
      if (!ret) {
        param[2].ret = "2";
        return false;
      }
    } else {
      ret = Number(value) > Number(tmpvalue);
      if (!ret) {
        param[2].ret = "1";
        return false;
      }
    }
    if (param[2].discrepantMode) {
      ret = Number(value) - Number(tmpvalue) <= Number(param[2].discrepantMode);
      if (!ret) {
        param[2].ret = "3";
        return false;
      }
    }
    obj.parent().next().children().hide();
    return true;
  }
}
function test_lessThan(obj, value, param, type) {
  if ("errstring" == type) {
    var tempstring = {
      1: param[2].separate
        ? 'Por favor insira um valor inferior a "{0}". '
        : "Por favor insira um valor menor do que o último. ",
      2: param[2].separate
        ? 'Por favor insira um valor não superior a "{0}". '
        : "Por favor insira um valor não superior ao último. ",
      3: param[2].separate
        ? "Assegure-se de que a diferença com o primeiro não seja maior que {1}. "
        : "Assegure-se de que a diferença com o primeiro não seja maior que {1}. ",
    };
    return $.validator.format(
      tempstring[param[2].ret],
      param[2].idtext,
      param[2].discrepantMode
    );
  } else {
    var tmpvalue = obj.val();
    var ret = true;
    if (param[2].equal) {
      ret = Number(value) <= Number(tmpvalue);
      if (!ret) {
        param[2].ret = "2";
        return false;
      }
    } else {
      ret = Number(value) < Number(tmpvalue);
      if (!ret) {
        param[2].ret = "1";
        return false;
      }
    }
    if (param[2].discrepantMode) {
      ret = Number(tmpvalue) - Number(value) <= Number(param[2].discrepantMode);
      if (!ret) {
        param[2].ret = "3";
        return false;
      }
    }
    obj.parent().next().children().hide();
    return true;
  }
}
jQuery.validator.addMethod(
  "extremumRange",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (2 > param.length) {
      return true;
    }
    var obj = get_element_obj($(element), param[1]);
    if (3 > param.length) {
      param[2] = {};
    }
    param[2]["idtext"] = obj.parent().prev().text();
    if (obj.is(":hidden") || "" == obj.val()) {
      return true;
    }
    var selectMode = {
      greatThan: test_greatThan,
      lessThan: test_lessThan,
    };
    return selectMode[param[0]](obj, value, param);
  },
  function (param, element) {
    var selectMode = {
      greatThan: test_greatThan,
      lessThan: test_lessThan,
    };
    return selectMode[param[0]]("", "", param, "errstring");
  }
);
function range_greatThan(obj, value, param, type) {
  if ("errstring" == type) {
    var tempstring = {
      1: param[2].separate
        ? 'Por favor, indique um valor superior a "{0}". '
        : param[2].objPosition == "first"
          ? "Por favor insira um valor maior do que o anterior. "
          : "Por favor insira um valor maior do que o último.",
      2: param[2].separate
        ? 'Por favor insira um valor não inferior a "{0}". '
        : param[2].objPosition == "first"
          ? "Por favor insira um valor não inferior ao primeiro. "
          : "Por favor insira um valor não inferior ao último. ",
      3: param[2].separate
        ? 'Por favor, assegure a diferença com "{0}" não maior que {1}. '
        : param[2].objPosition == "first"
          ? "Assegure-se de que a diferença com o primeiro não seja maior que {1}. "
          : "Assegure-se de que a diferença com o primeiro não seja maior que {1}. ",
    };
    return $.validator.format(
      tempstring[param[2].ret],
      param[2].idtext,
      param[2].discrepantMode
    );
  } else {
    obj.parent().next().children().hide();
    var tmpvalue = obj.val();
    var ret = true;
    if (param[2].equal) {
      ret = Number(value) >= Number(tmpvalue);
      if (!ret) {
        param[2].ret = "2";
        return false;
      }
    } else {
      ret = Number(value) > Number(tmpvalue);
      if (!ret) {
        param[2].ret = "1";
        return false;
      }
    }
    if (param[2].discrepantMode) {
      ret = Number(value) - Number(tmpvalue) <= Number(param[2].discrepantMode);
      if (!ret) {
        param[2].ret = "3";
        return false;
      }
    }
    return true;
  }
}
function range_lessThan(obj, value, param, type) {
  if ("errstring" == type) {
    var tempstring = {
      1: param[2].separate
        ? 'Por favor insira um valor inferior a "{0}". '
        : param[2].objPosition == "first"
          ? "Por favor insira um valor menor do que o anterior. "
          : "Por favor insira um valor menor do que o último. ",
      2: param[2].separate
        ? 'Por favor insira um valor não superior a "{0}". '
        : param[2].objPosition == "first"
          ? "Por favor insira um valor não superior ao primeiro."
          : "Por favor insira um valor não superior ao último. ",
      3: param[2].separate
        ? 'Por favor, assegure a diferença com "{0}" não maior que {1}. '
        : param[2].objPosition == "first"
          ? "Assegure-se de que a diferença com o primeiro não seja maior que {1}. "
          : "Assegure-se de que a diferença com o primeiro não seja maior que {1}. ",
    };
    return $.validator.format(
      tempstring[param[2].ret],
      param[2].idtext,
      param[2].discrepantMode
    );
  } else {
    obj.parent().next().children().hide();
    var tmpvalue = obj.val();
    var ret = true;
    if (param[2].equal) {
      ret = Number(value) <= Number(tmpvalue);
      if (!ret) {
        param[2].ret = "2";
        return false;
      }
    } else {
      ret = Number(value) < Number(tmpvalue);
      if (!ret) {
        param[2].ret = "1";
        return false;
      }
    }
    if (param[2].discrepantMode) {
      ret = Number(tmpvalue) - Number(value) <= Number(param[2].discrepantMode);
      if (!ret) {
        param[2].ret = "3";
        return false;
      }
    }
    return true;
  }
}
jQuery.validator.addMethod(
  "compareRange",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (2 > param.length) {
      return true;
    }
    var obj = get_element_obj($(element), param[1]);
    if (3 > param.length) {
      param[2] = {};
    }
    param[2]["idtext"] = obj.parent().prev().text();
    var selectMode = {
      greatThan: range_greatThan,
      lessThan: range_lessThan,
    };
    return selectMode[param[0]](obj, value, param);
  },
  function (param, element) {
    var selectMode = {
      greatThan: range_greatThan,
      lessThan: range_lessThan,
    };
    return selectMode[param[0]]("", "", param, "errstring");
  }
);
jQuery.validator.addMethod(
  "banValue",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    var paramLen = param.length;
    for (var i = 0; i < paramLen; i++) {
      var range = param[i];
      if (typeof range === "string") {
        if (value == range) {
          return false;
        }
      } else {
        if (value >= range[0] && value <= range[1]) {
          return false;
        }
      }
    }
    return true;
  },
  function (param, element) {
    var rangesStr = "";
    var paramLen = param.length;
    for (var i = 0; i < paramLen; i++) {
      var paraVal = param[i];
      if ("object" === typeof paraVal) {
        rangesStr += paraVal[0] + "~" + paraVal[1];
      } else {
        rangesStr += paraVal;
      }
      if (i < paramLen - 1) {
        rangesStr += ", ";
      }
    }
    if (paramLen > 1) {
      return $.validator.format(
        'Por favor, garantir a entrada não nas faixas de "{0}". ',
        rangesStr
      );
    } else {
      return $.validator.format(
        'Por favor, garantir a entrada não é igual a "{0}". ',
        rangesStr
      );
    }
  }
);
jQuery.validator.addClassRules({
  ipSepCheck: {
    required: true,
    integer: true,
    range: [0, 255],
  },
  macSepCheck: {
    required: true,
    HEX: true,
    fixedlength: 2,
  },
});
function checkTimeHMS(timestr) {
  var re =
    /^([0-1]{1}[0-9]{1}|[2]{1}[0-3]{1}):[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;
  if (re.test(timestr) == true) {
    return true;
  }
  return false;
}
jQuery.validator.addMethod(
  "checkTimeHMS",
  function (value, element, params) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (checkTimeHMS(value) == true) {
      return true;
    }
    return false;
  },
  "Insira o formato de hora correto como HH: MM: SS."
);
function time_earlierThan(obj, value, param, type) {
  var tmpvalue = obj.val();
  var ret = true;
  var valuearr = value.split(":");
  var tmpvaluearr = tmpvalue.split(":");
  if (valuearr[0] < tmpvaluearr[0]) {
    return true;
  } else {
    if (valuearr[0] === tmpvaluearr[0] && valuearr[1] < tmpvaluearr[1]) {
      return true;
    } else {
      if (valuearr[1] === tmpvaluearr[1] && valuearr[2] < tmpvaluearr[2]) {
        return true;
      }
    }
    return false;
  }
}
function time_laterThan(obj, value, param, type) {
  var tmpvalue = obj.val();
  var ret = true;
  var valuearr = value.split(":");
  var tmpvaluearr = tmpvalue.split(":");
  if (valuearr[0] > tmpvaluearr[0]) {
    return true;
  } else {
    if (valuearr[0] === tmpvaluearr[0] && valuearr[1] > tmpvaluearr[1]) {
      return true;
    } else {
      if (valuearr[1] === tmpvaluearr[1] && valuearr[2] > tmpvaluearr[2]) {
        return true;
      }
    }
    return false;
  }
}
jQuery.validator.addMethod(
  "timeComparison",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    if (2 > param.length) {
      return true;
    }
    var obj = get_element_obj($(element), param[1]);
    if (3 > param.length) {
      param[2] = {};
    }
    param[2]["idtext"] = obj.parent().prev().text();
    if (obj.is(":hidden") || "" == obj.val()) {
      return true;
    }
    var selectMode = {
      laterThan: time_laterThan,
      earlierThan: time_earlierThan,
    };
    return selectMode[param[0]](obj, value, param);
  },
  "A hora de início deve ser anterior à hora de término."
);
function compareIPv4(firstIP, secondIP) {
  var fIP;
  var sIP;
  fIP = firstIP.split(".");
  sIP = secondIP.split(".");
  for (var i = 0; i < 4; i++) {
    if (fIP[i] != "" && sIP[i] != "") {
      fIP[i] = parseInt(fIP[i], 10);
      sIP[i] = parseInt(sIP[i], 10);
    }
    if (fIP[i] > sIP[i]) {
      return 1;
    } else if (fIP[i] < sIP[i]) {
      return -1;
    }
  }
  return 0;
}
function checkWholeIPv4(k, v, ipValue, template) {
  var vLen = v.length;
  var retMsg = "";
  for (var j = 0; j < vLen; j++) {
    if (retMsg != "") {
      retMsg += ", ";
    }
    var range = v[j];
    if (typeof range === "string") {
      retMsg += range;
    } else {
      retMsg += range[0] + " ~ " + range[1];
    }
  }
  if (k == "banValue") {
    retMsg = "Não é permitido introduzir o seguinte valor (es): {0}. ".format(
      retMsg
    );
    for (var i = 0; i < vLen; i++) {
      var range = v[i];
      if (typeof range === "string") {
        if (ipValue == range) {
          return [false, k, retMsg];
        }
      } else {
        if (
          "-1" != compareIPv4(ipValue, range[0]) &&
          "1" != compareIPv4(ipValue, range[1])
        ) {
          return [false, k, retMsg];
        }
      }
    }
  } else if (k == "allowRange") {
    retMsg =
      "Entrada inválida. Por favor, certifique-se de que a entrada esteja no seguinte intervalo: {0}. ".format(
        retMsg
      );
    for (var i = 0; i < vLen; i++) {
      var range = v[i];
      if (
        "-1" != compareIPv4(ipValue, range[0]) &&
        "1" != compareIPv4(ipValue, range[1])
      ) {
        return [true, "", ""];
      }
    }
    return [false, k, retMsg];
  } else if (k == "notLessThan") {
    retMsg = "";
    var IPObj = $("[id^='" + v + "']", template);
    IPObj.FillIPorMacDataCombination("sub_" + v, ".", 4);
    var minValue = IPObj.val();
    if (-1 == compareIPv4(ipValue, minValue)) {
      return [false, k, retMsg];
    }
  } else if (k == "notMoreThan") {
    retMsg = "";
    var IPObj = $("[id^='" + v + "']", template);
    IPObj.FillIPorMacDataCombination("sub_" + v, ".", 4);
    var maxValue = IPObj.val();
    if (1 == compareIPv4(ipValue, maxValue)) {
      return [false, k, retMsg];
    }
  } else {
  }
  return [true, "", ""];
}
function checkWholeMac(k, v, macValue) {
  var vLen = v.length;
  var retMsg = "";
  for (var j = 0; j < vLen; j++) {
    if (retMsg != "") {
      retMsg += ", ";
    }
    var range = v[j];
    if (typeof range === "string") {
      retMsg += range;
    } else {
      retMsg += range[0] + " ~ " + range[1];
    }
  }
  if (k == "banValue") {
    retMsg = "Não é permitido introduzir o seguinte valor (es): {0}. ".format(
      retMsg
    );
    for (var i = 0; i < vLen; i++) {
      var range = v[i];
      if (typeof range === "string") {
        if (macValue.toLowerCase() == range.toLowerCase()) {
          return [false, k, retMsg];
        }
      }
    }
  } else {
  }
  return [true, "", ""];
}
function getMsgofWholeMACIPCheck(
  checkRetArray,
  ruleObj,
  checkValue,
  checkParaName
) {
  var errMsg = "";
  var ruleName = checkRetArray[1];
  if (ruleObj.messages[ruleName] != undefined) {
    return ruleObj.messages[ruleName];
  }
  switch (ruleName) {
    case "banValue": {
      if (checkParaName != "") {
        errMsg = checkParaName + checkRetArray[2];
      } else {
        errMsg =
          "A operação atual é inválida, por favor, verifique os parâmetros de configuração." +
          "[" +
          "Erro:" +
          checkValue +
          "]";
      }
      break;
    }
    case "allowRange": {
      if (checkParaName != "") {
        errMsg = checkParaName + checkRetArray[2];
      } else {
        errMsg =
          "A operação atual é inválida, por favor, verifique os parâmetros de configuração." +
          "[" +
          "Erro:" +
          checkValue +
          "]";
      }
      break;
    }
    default: {
      errMsg = "error msg undefined!";
    }
  }
  return errMsg;
}
jQuery.validator.addMethod(
  "utf8LengthRange",
  function (value, element, param) {
    if (this.optional(element)) {
      return "dependency-mismatch";
    }
    var valLength = value.length;
    var param1 = param[0];
    var param2 = param[1];
    if (param2 < 3) {
      alert("utf8LengthRange is invalid![" + param2 + "<" + 3 + "]");
    } else {
      param1 = Math.ceil(parseInt(param[0]) / 3);
      param2 = Math.floor(parseInt(param[1]) / 3);
      if (param1 < param2) {
        if (valLength >= param1 && valLength <= param2) {
          return true;
        }
      } else if (param1 == param2) {
        if (valLength == param2) {
          return true;
        }
      } else {
        alert("utf8LengthRange [" + param1 + "," + param2 + "] is invalid!");
      }
    }
    return false;
  },
  function (param, element) {
    var lengthStr = "";
    var param1 = param[0];
    var param2 = param[1];
    if (param2 < 3) {
      lengthStr = " Range Error!!!!!![param2<WEB_UTF8_REALBYTE]";
    } else {
      param1 = Math.ceil(parseInt(param[0]) / 3);
      param2 = Math.floor(parseInt(param[1]) / 3);
      if (param1 < param2) {
        lengthStr = param1 + " ~ " + param2;
      } else if (param1 == param2) {
        lengthStr = param2;
      } else {
        lengthStr = " Range Error!!!!!![" + param1 + "," + param2 + "]";
      }
    }
    return $.validator.format(
      "Por favor insira um valor com {0} caracteres.",
      lengthStr
    );
  }
);

(function () {
  $(document).ready(function () {
    var curv = 139;
    if (curv == "65") $("#languageSwitch").hide();
  });
})();

(function () {
  $(document).ready(function () {
    var CountryCode = "139";
    if (CountryCode == "152" || CountryCode == "163") {
      $("#logo").attr("class", "logo_Claro");
    }
  });
})();
(function () {
  $(document).ready(function () {
    var CountryCode = "139";
    if (CountryCode == "21") {
      $("#logo").attr("class", "logo_Antel");
    }
  });
})();

(function () {
  $(document).ready(function () {
    var CountryCode = "139";
    if (CountryCode == "36") {
      $("#logo").addClass("logo_Tot");
      $("#timeArea").addClass("timeArea_Tot");
    }
  });
})();
(function () {
  $(document).ready(function () {
    var CountryCode = "139";
    if (CountryCode == "106") {
      $("#logo").addClass("logo_Morocco");
    }
  });
})();
(function () {
  $(document).ready(function () {
    var CountryCode = "139";
    if (CountryCode == "138") {
      $("#logo").addClass("logo_IvoryOrange");
    }
  });
})();
(function () {
  $(document).ready(function () {
    var CountryCode = "139";
    if (CountryCode == "174") {
      $("#logo").addClass("logo_Orange");
    }
  });
})();

(function () {
  $(document).ready(function () {
    var CountryCode = "139";
    if (CountryCode == "137") {
      $("#logo").attr("class", "logo_Tarr");
    }
  });
})();

var menuTreeJSON = [
  {
    id: "homePage",
    name: "Inicio",
    extData: "Mostra as informações importantes.",
    area: [{ area: "home_t.lp" }],
  },
  { id: "mmTopology", name: "Topologia", area: [{ area: "topo_t.lp" }] },
  { id: "internet", name: "Internet" },
  { id: "localnet", name: "Rede local" },
  { id: "voip", name: "VoIP" },
  { id: "mgrAndDiag", name: "Gerência & Diagnóstico" },
];
var menuTreeObj = new MenuTreeClass(menuTreeJSON);
var _sessionTmpToken =
  "\x58\x6c\x47\x38\x43\x56\x31\x51\x70\x5a\x4c\x6a\x4e\x57\x44\x67\x34\x7a\x64\x77\x50\x72\x6d\x41";
var preLoadImg = [];
preLoadImg[0] = "/img/nv_s.gif";
preLoadImg[1] = "/img/nv_left.gif";
preLoadImg[2] = "/img/nv_right.gif";
preLoadImg[3] = "/img/nv_middle.gif";
preLoadImg[4] = "/img/English_s.gif";
preLoadImg[5] = "/img/Chinese.gif";
preLoadImg[6] = "/img/Chinese_s.gif";
preLoadImg[7] = "/img/English.gif";
preLoadImg[8] = "/img/waiting.gif";
preLoadImg[9] = "/img/info_m.png";
preLoadImg[10] = "/img/waiting_w.gif";
function preload(Img) {
  var imgTmp = [];
  for (var i = 0; i < Img.length; i++) {
    imgTmp[i] = new Image();
    imgTmp[i].src = Img[i];
  }
}
preload(preLoadImg);
