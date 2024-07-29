function useRegex(input) {
    let regex = /([01]\d|2[0-3]):[0-5]\d:[0-5]\d/;
    return regex.test(input);
}

$(document).ready(function () {
  function e() {
    $(".generated").remove(), $(".clear").remove();
    for (var e = $("textarea").val().replace("<script>", "").replace("</script>", "").split("\n"), t = 0; t < e.length; t++)
      $(".output").append(
        '<div class="generated" id="chatlogOutput">' +
          (useRegex(e[t]) ? e[t].slice(11) : e[t].slice(0)) +
          '</div><div class="clear"></div>'
      );
    $(".generated").each(function () {
    (txtString = $(this).text()),

		navigator.userAgent.indexOf("Chrome") != -1 && $(this).append(" ⠀"),
	  // Global
		txtString.toLowerCase().indexOf("*") >= 0 && $(this).addClass("me"),
		txtString.toLowerCase().indexOf(">") >= 0 && $(this).addClass("me"),

	  // English
	  txtString.toLowerCase().indexOf(" says:") >= 0 && $(this).addClass("white"),
		txtString.toLowerCase().indexOf(" says [low]:") >= 0 && $(this).addClass("grey"),

		txtString.toLowerCase().indexOf("you paid $") >= 0 && $(this).addClass("money"),
		txtString.toLowerCase().indexOf("you received") >= 0 && $(this).addClass("money"),
		txtString.toLowerCase().indexOf("you gave") >= 0 && $(this).addClass("money"),
		txtString.toLowerCase().indexOf("paid you $") >= 0 && $(this).addClass("money"),

		txtString.toLowerCase().indexOf("you can die") >= 0 && $(this).addClass("death"),
		txtString.toLowerCase().indexOf(" whispers:") >= 0 && $(this).addClass("whisper"),
		txtString.toLowerCase().indexOf(" whispers:") >= 0 && txtString.toLowerCase().indexOf("(car)") >= 0 && $(this).addClass("carwhisper"),
		txtString.toLowerCase().indexOf(" (cellphone)") >= 0 && $(this).addClass("megafon"),

        // SAS

        txtString.toLowerCase().indexOf(" diz:") >= 0 && $(this).addClass("white"),
		txtString.toLowerCase().indexOf("[baixo] ") >= 0 && $(this).addClass("grey"),

		txtString.toLowerCase().indexOf("você pagou ") >= 0 && $(this).addClass("money"),
		txtString.toLowerCase().indexOf("você recebeu ") >= 0 && $(this).addClass("money"),
		txtString.toLowerCase().indexOf("você deu") >= 0 && $(this).addClass("money"),
		txtString.toLowerCase().indexOf("pagou a você ") >= 0 && $(this).addClass("money"),

		txtString.toLowerCase().indexOf("character kill ") >= 0 && $(this).addClass("death"),
		txtString.toLowerCase().indexOf("sussurro de ") >= 0 && $(this).addClass("megafon"),
    txtString.toLowerCase().indexOf("sussurro para ") >= 0 && $(this).addClass("megafon"),
		txtString.toLowerCase().indexOf(" diz (telefone)") >= 0 && $(this).addClass("megafon"),

		$(this).textContent += "‎  ",
        //REMOVE
        txtString || $(this).remove(),
        $(".generated:first").css("margin-top", "30px"),
        $(".generated:first").css("padding-top", "10px"),
        $(".generated:last").css("padding-bottom", "10px"),
        $(".generated:last").css("margin-bottom", "30px"),
        $(".generated").css(
          "background-color",
          "#" + $("#color-picker").spectrum("get").toHex()
        );
    });
  }
  charName = $("#name").val().toLowerCase();
  var t = $.jStorage.get("lastCharName");
  t || $.jStorage.set("lastCharName", ""),
    $("#name").val($.jStorage.get("lastCharName")),
    $("#name").bind("input propertychange", function () {
      (charName = $("#name").val().toLowerCase()),
        $.jStorage.set("lastCharName", charName),
        e();
    });
  var r = $.jStorage.get("lastFontSize"),
    o = $.jStorage.get("lastLineHeight");
  r || o
    ? ($(".output").css({
        "font-size": $.jStorage.get("lastFontSize") + "px",
        "line-height": $.jStorage.get("lastLineHeight") + "px",
      }),
      $("#font-label").text(
        "Tamanho (" + $.jStorage.get("lastFontSize") + "px):"
      ))
    : ($.jStorage.set("lastFontSize", "12"),
      $.jStorage.set("lastLineHeight", "0")),
    $("#decrease-fontsize").click(function () {
      (currentSize = parseInt($(".output").css("font-size"))),
        currentSize--,
        (currentLineHeight = parseInt($(".output").css("line-height"))),
        currentLineHeight--,
        currentLineHeight >= 0
          ? ($(".output").css({
              "font-size": currentSize + "px",
              "line-height": currentLineHeight + "px",
            }),
            $("#font-label").text("Tamanho (" + currentSize + "px):"),
            $.jStorage.set("lastFontSize", currentSize),
            $.jStorage.set("lastFontSize", currentLineHeight))
          : $(this).addClass("disabled");
    }),
    $("#increase-fontsize").click(function () {
      (currentSize = parseInt($(".output").css("font-size"))),
        currentSize++,
        (currentLineHeight = parseInt($(".output").css("line-height"))),
        currentLineHeight++,
        $(".output").css({
          "font-size": currentSize + "px",
          "line-height": currentLineHeight + "px",
        }),
        $("#font-label").text("Tamanho (" + currentSize + "px):"),
        $.jStorage.set("lastFontSize", currentSize),
        $.jStorage.set("lastLineHeight", currentLineHeight),
        $("#decrease-fontsize").removeClass("disabled");
    }),
    $("#reset-fontsize").click(function () {
      $(".output").css({ "font-size": "12px", "line-height": "0px" }),
        $("#font-label").text("Tamanho (12px):"),
        $.jStorage.set("lastFontSize", "12"),
        $.jStorage.set("lastLineHeight", "0");
    }),
    $("textarea").bind("input propertychange", function () {
      e();
    }),
    $("#color-picker").spectrum({
      color: "#000",
      showInput: !0,
      preferredFormat: "hex",
      change: function () {
        $.jStorage.set("lastColor", $("#color-picker").spectrum("get").toHex()),
          $(".generated").css(
            "background-color",
            "#" + $("#color-picker").spectrum("get").toHex()
          );
      },
    }),
    $("#color-picker").spectrum("set", $.jStorage.get("lastColor"));
});