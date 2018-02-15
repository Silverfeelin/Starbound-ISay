$(function() {

  // Bind output buttons
  $("#btnExport").click(generateExport);
  $("#btnExportCommand").click(generateExportCommand);
  $("#btnText").click(generateText);
  $("#btnTextCommand").click(generateTextCommand);
  
  $("#htmlOutput").html(FormatStarboundNameHTML($("#text").get(0).value));
  $("#text").keyup(function() {
    $("#htmlOutput").html(FormatStarboundNameHTML($("#text").get(0).value));
  });
  
  clipboard = new Clipboard(".btnCopy");
})

function generateExport() {
  getOutput(function(res) {
    var blob = new Blob([ JSON.stringify(res, null, 2)], {type: "text/plain;charset=utf8"});
    saveAs(blob, "TextParticles.json");
  });
}

function generateExportCommand() {
  getOutput(function(res) {
    var cmd = "/spawnitem paintgunpurple 1 '" + JSON.stringify(res).replace("'", "") + "'";
    var blob = new Blob([ cmd ], {type: "text/plain;charset=utf8"});
    saveAs(blob, "TextParticlesCommand.txt");
  });
}

function generateText() {
  getOutput(function(res) {
    var domOutput = $("#output").get(0);
    domOutput.value = JSON.stringify(res, null, 2);
    
    if ($(domOutput).height() < 250)
    {
      $(domOutput).animate({height: 250}, 250);
    }
  });
}

function generateTextCommand() {
  getOutput(function(res) {
    var domOutput = $("#output").get(0);
    var cmd = "/spawnitem paintgunpurple 1 '" + JSON.stringify(res).replace("'", "") + "'";
    domOutput.value = cmd;
    if ($(domOutput).height() > 50)
    {
      $(domOutput).animate({height: 50}, 250);
    }
  });
}

function getOutput(callback) {
  jQuery.get('template.json', function(data) {
    
    var projectileParameters = data.primaryAbility.projectileParameters;
    
    // Item Details
   
    // Col 1
    data.shortdescription = $("#title").get(0).value;
    data.category = $("#subtitle").get(0).value;
    data.description = $("#description").get(0).value;
    data.inventoryIcon = $("#icon").get(0).value;
    
    // Col 2
    data.rarity = $("#rarity").get(0).value;
    data.price = parseInt($("#price").get(0).value);
    data.maxStack = parseInt($("#maxStack").get(0).value);
    projectileParameters.actionOnReap[0].options[0] = $("#fireSound").get(0).value;
    
    // Col 3
    data.primaryAbility.fireTime = parseDOMFloat("#fireTime");
    data.primaryAbility.inaccuracy = parseDOMFloat("#inaccuracy");
    data.primaryAbility.fireType = $("#fireType").get(0).value;
    data.primaryAbility.burstCount = parseInt($("#burstCount").get(0).value);
    data.primaryAbility.burstTime = parseDOMFloat("#burstTime");
    
    // One or two handed.
    var twoHanded = $("#twoHanded").get(0).checked;
    data.twoHanded = twoHanded;
    data.primaryAbility.stances.idle.twoHanded = twoHanded;
    data.primaryAbility.stances.fire.twoHanded = twoHanded;
    data.primaryAbility.stances.cooldown.twoHanded = twoHanded;
    
    // Projectile Details
    
    //Text
    projectileParameters.actionOnReap[1].specification.text = $("#text").get(0).value;
    
    // Col 1
    projectileParameters.actionOnReap[1].specification.size = parseDOMFloat("#textSize");
    projectileParameters.actionOnReap[1].specification.timeToLive = parseDOMFloat("#textDuration");
    projectileParameters.actionOnReap[1].specification.destructionAction = $("#destructionAction").get(0).value;
    projectileParameters.actionOnReap[1].specification.destructionTime = parseDOMFloat("#destructionDuration");
    
    // Col 2
    projectileParameters.actionOnReap[1].specification.position = [
      parseDOMFloat("#horizontalOffset"),
      parseDOMFloat("#verticalOffset")
    ];
    projectileParameters.actionOnReap[1].specification.velocity = [
      parseDOMFloat("#horizontalVelocity"),
      parseDOMFloat("#verticalVelocity")
    ];
    
    // Col 3
    projectileParameters.actionOnReap[1].specification.variance.position = [
      parseDOMFloat("#horizontalOffsetVariance"),
      parseDOMFloat("#verticalOffsetVariance")
    ];
    projectileParameters.actionOnReap[1].specification.variance.velocity = [
      parseDOMFloat("#horizontalVelocityVariance"),
      parseDOMFloat("#verticalVelocityVariance")
    ];
    
    callback(data);
  });
}

function parseDOMFloat(domName) {
  return parseFloat($(domName).get(0).value.replace(",", "."));
}

function CopyToClipboard(text) {
    var c = text.createTextRange();
    c.execCommand("Copy");
}