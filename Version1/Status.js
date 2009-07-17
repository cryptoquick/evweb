function StatusWindow(newID) {

   // Private member variables
   var strID = newID;
   // Assign default values
   var strSystemName = '';
   var lngPctArmor = 100;
   var lngPctFuel = 100;
   var lngPctShields = 100;
   var aryStrCargo = new Array();
   var strSelected = 'Nothing Selected';
   var lngCredits = 0;

   // Expose our functions as public methods
   this.setSystemName = setSystemName;
   this.getSystemName = getSystemName;
   this.setSelected = setSelected;
   this.getSelected = getSelected;
   this.addCargo = addCargo;
   this.getCargo = getCargo;
   this.removeCargo = removeCargo;
   this.setArmor = setArmor;
   this.getArmor = getArmor;
   this.addArmor = addArmor;
   this.removeArmor = removeArmor;
   this.setShields = setShields;
   this.getShields = getShields;
   this.addShields = addShields;
   this.removeShields = removeShields;
   this.setFuel = setFuel;
   this.getFuel = getFuel;
   this.addFuel = addFuel;
   this.removeFuel = removeFuel;
   this.setCredits = setCredits;
   this.getCredits = getCredits;
   this.addCredits = addCredits;
   this.removeCredits = removeCredits;
   this.refresh = refresh;

   init();

   // Internal functions to control behavior
   function init() {
      // Remove the status window, if one exists with the same name.
      var divStatus;
      try {
         divStatus = document.getElementById(strID);
         document.body.removeChild(divStatus);
      } catch(err) {
         
      }
      // Create a new status window
      divStatus = document.createElement('div');
      divStatus.id = strID;
      divStatus.className = 'Status';
      // Create DIVs for all the sub-windows
      var divSystemName = document.createElement('div');
      var divMiniMap = document.createElement('div');
      var divArmor = document.createElement('div');
      var divArmorBar = document.createElement('div');
      var divArmorPct = document.createElement('div');
      var divShields = document.createElement('div');
      var divShieldsBar = document.createElement('div');
      var divShieldsPct = document.createElement('div');
      var divCargo = document.createElement('div');
      var divSelected = document.createElement('div');
      var divFuel = document.createElement('div');
      var divFuelBar = document.createElement('div');
      var divFuelPct = document.createElement('div');
      var divCredits = document.createElement('div');
      // Set the class names, so the appropriate CSS classes will take effect
      divSystemName.className = 'SystemName';
      divMiniMap.className = 'MiniMap';
      divArmor.className = 'Armor';
      divArmorBar.className = 'Bar';
      divArmorPct.className = 'Pct';
      divShields.className = 'Shields';
      divShieldsBar.className = 'Bar';
      divShieldsPct.className = 'Pct';
      divCargo.className = 'Cargo';
      divSelected.className = 'Selected';
      divFuel.className = 'Fuel';
      divFuelBar.className = 'Bar';
      divFuelPct.className = 'Pct';
      divCredits.className = 'Credits';
      // Add the individual parts to the status window.
      divStatus.appendChild(divSystemName);
      divStatus.appendChild(divMiniMap);
      divArmor.appendChild(divArmorBar);
      divArmor.appendChild(divArmorPct);
      divStatus.appendChild(divArmor);
      divShields.appendChild(divShieldsBar);
      divShields.appendChild(divShieldsPct);
      divStatus.appendChild(divShields);
      divStatus.appendChild(divCargo);
      divStatus.appendChild(divSelected);
      divFuel.appendChild(divFuelBar);
      divFuel.appendChild(divFuelPct);
      divStatus.appendChild(divFuel);
      divStatus.appendChild(divCredits);
      // Put the status window on the page.
      document.body.appendChild(divStatus);
   }

   function refresh() {
      refreshSystemName();
      refreshArmor();
      refreshShields();
      refreshCargo();
      refreshSelected();
      refreshFuel();
      refreshCredits();
   }

   function refreshSystemName() {
      // Populate the system name
      var divStatus = document.getElementById(strID);
      var divSystemName = getDiv(divStatus, 'SystemName');
      divSystemName.innerHTML = strSystemName;
   }
   function refreshArmor() {
      // Populate the Armor numbers and percent bar
      var divStatus = document.getElementById(strID);
      var divArmor = getDiv(divStatus, 'Armor');
      setPercent(divArmor, lngPctArmor);
   }
   function refreshShields() {
      // Populate the Shield numbers and percent bar
      var divStatus = document.getElementById(strID);
      var divShields = getDiv(divStatus, 'Shields');
      setPercent(divShields, lngPctShields);
   }
   function refreshCargo() {
      // Populate the list of items in the cargo hold
      var divStatus = document.getElementById(strID);
      var aryCargo = aryStrCargo;
      
      var strCargo = '';
      for (var i=0; i < aryCargo.length; i++)
         strCargo = strCargo + aryCargo[i] + '<br />';
      var divCargo = getDiv(divStatus, 'Cargo');
      divCargo.innerHTML = strCargo;
   }
   function refreshSelected() {
      // Populate the selected item, if any
      var divStatus = document.getElementById(strID);
      var divSelected = getDiv(divStatus, 'Selected');
      divSelected.innerHTML = strSelected == '' ? 'No object(s) selected' : strSelected;
   }
   function refreshFuel() {
      // Populate the Fuel numbers and percent bar
      var divStatus = document.getElementById(strID);
      var divFuel = getDiv(divStatus, 'Fuel');
      setPercent(divFuel, lngPctFuel);
   }
   function refreshCredits() {
      // Populate the Credits
      var divStatus = document.getElementById(strID);
      var divCredits = getDiv(divStatus, 'Credits');
      divCredits.innerHTML = lngCredits + ' Cr';
   }

   function setPercent(divParent, lngPercent) {
      var aryDIVs = divParent.getElementsByTagName('div');
      for (var i = 0; i < aryDIVs.length; i++) {
         //alert('Debug: Setting ' + aryDIVs[i].className + ' for ' + divParent.className);
         if (aryDIVs[i].className == 'Pct') {
            aryDIVs[i].innerHTML = divParent.className + ': ' + lngPercent + '%';
         }
         if (aryDIVs[i].className == 'Bar') {
            aryDIVs[i].style.width = lngPercent + '%';
         }
      }
   }

   function getDiv(divStatus, strDiv) {
      var aryDIVs = divStatus.getElementsByTagName('div');
      for (var i=0; i < aryDIVs.length; i++) {
         if (aryDIVs[i].className == strDiv) {
            return aryDIVs[i];
         }
      }
      return false;
   }

   // Public functions to control object properties
   function setSystemName(newSystemName) {
      strSystemName = newSystemName;
      refreshSystemName();
   }
   function getSystemName() {
      return strSystemName
   }
   function setArmor(newArmor) {
      lngPctArmor = newArmor;
      if (lngPctArmor > 100) {
         lngPctArmor = 100;
      }
      if (lngPctArmor < 0) {
         lngPctArmor = 0;
      }
      refreshArmor();
   }
   function getArmor() {
      return lngPctArmor;
   }
   function addArmor(newAmount) {
      this.setArmor(this.getArmor() + newAmount);
   }
   function removeArmor(newAmount) {
      this.setArmor(this.getArmor() - newAmount);
   }

   function setShields(newShields) {
      lngPctShields = newShields;
      if (lngPctShields > 100) {
         lngPctShields = 100;
      }
      if (lngPctShields < 0) {
         lngPctShields = 0;
      }
      refreshShields();
   }
   function getShields() {
      return lngPctShields;
   }
   function addShields(newAmount) {
      this.setShields(this.getShields() + newAmount);
   }
   function removeShields(newAmount) {
      this.setShields(this.getShields() - newAmount);
   }
   function setFuel(newFuel) {
      lngPctFuel = newFuel;
      if (lngPctFuel > 100) {
         lngPctFuel = 100;
      }
      if (lngPctFuel < 0) {
         lngPctFuel = 0;
      }
      refreshFuel();
   }
   function getFuel() {
      return lngPctFuel;
   }
   function addFuel(newAmount) {
      this.setFuel(this.getFuel() + newAmount);
   }
   function removeFuel(newAmount) {
      this.setFuel(this.getFuel() - newAmount);
   }
   function addCargo(newItem) {
      aryStrCargo[aryStrCargo.length] = newItem;
      aryStrCargo.sort();
      refreshCargo();
   }
   function removeCargo(oldItem) {
      if (isNaN(oldItem)) {
         var j = 0;
         while (j < aryStrCargo.length) {
            if (aryStrCargo[j] == oldItem) {
               aryStrCargo.splice(j, 1);
            } else {
               j++;
            }
         }
      } else {
         aryStrCargo.splice(oldItem, 1);
      }
      refreshCargo();
   }
   function getCargo() {
      return aryStrCargo;
   }
   function setSelected(newSelected) {
      strSelected = newSelected;
      refreshSelected();
   }
   function getSelected() {
      return strSelected;
   }
   function setCredits(newCredits) {
      lngCredits = newCredits;
       if (lngCredits < 0) {
         lngCredits = 0;
      }
      refreshCredits();
   }
   function getCredits() {
      return lngCredits;
   }
   function addCredits(newAmount) {
      this.setCredits(this.getCredits() + newAmount);
   }
   function removeCredits(newAmount) {
      this.setCredits(this.getCredits() - newAmount);
   }
}