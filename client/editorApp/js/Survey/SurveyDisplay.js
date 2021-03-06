/**
 * Created by a on 11/16/2015.
 */
'use strict';
var SurveyDisplay = (function(vm) {
  //var vm = null;

  var init = function(surveyEditor) {
    vm = surveyEditor;
    vm.currentlyDisplayedPage = 0;
    vm.showDBDatapreview = false;

    vm.conditionConstraintType = {
      contain: 'CONTAIN',
      equal: 'EQUAL',
      greaterThan: 'GREATER THAN',
      greaterOrEqual: 'GREATER OR EQUAL',
      lessThan: 'LESS THAN',
      lessOrEqual: 'LESS OR EQUAL'
    };

    vm.conditionLogicalPositive = {
      is: 'IS / DOES',
      isNot: 'IS NOT / DOES NOT'
    };

    vm.conditionLogicalBind = {
      and: 'AND',
      or: 'OR'
    };

    //
    //  -----------------
    //
    vm.displayThisPage = function(page) {
      var pageCandidate = _.findIndex(vm.pages, {surveyPageId: page.surveyPageId});
      if (pageCandidate === vm.currentlyDisplayedPage) {
        if (vm.isDisplayPermitted(vm.pages[pageCandidate].displayCondition)) {
          return true;
        }
      }
      return false;
    };
    //
    //  -----------------
    //
    vm.nextPage = function() {
      vm.currentlyDisplayedPage++;
      vm.updateEditorNavigationFromDisplay();
    };
    //
    //  -----------------
    //
    vm.previousPage = function() {
      vm.currentlyDisplayedPage--;
      vm.updateEditorNavigationFromDisplay();
    };
    //
    //  -----------------
    //
    vm.updateEditorNavigationFromDisplay = function() {
      if (typeof vm.selectorPages  !== 'undefined') {
        vm.currentPageId = vm.selectorPages[vm.currentlyDisplayedPage];
        vm.propagatePageChange();
      }
    };
    //
    //  -----------------
    //
    vm.showDBDataPreview = function() {
      vm.showDBDatapreview = true;
      vm.surveyDBDataLayout = [];
      for (var iPage = 0; iPage < vm.pages.length; iPage++) {
        var aPage = vm.pages[iPage];
        for (var iSection = 0; iSection < aPage.sections.length; iSection++) {
          var aSection = aPage.sections[iSection];
          for (var iQuestion = 0; iQuestion < aSection.questions.length; iQuestion++) {
            var aQuestion = aSection.questions[iQuestion];
            var rowEntry = {
              pageKey: aPage.key,
              sectionKey: aSection.key,
              questionKey: aQuestion.key,
              valueOptionsIsMultivalued: aQuestion.valueOptionsIsMultivalued
            };
            var valueOutput = [];
            for (var iOption = 0; iOption < aQuestion.valueOptions.length; iOption++) {
              var aValueOption = aQuestion.valueOptions[iOption];
              var valOption = {
                key: aValueOption.key,
                value: aValueOption.userValue
              };
              valueOutput.push(valOption);
            }
            rowEntry.valueOutput = valueOutput;
            vm.surveyDBDataLayout.push(rowEntry);
          }
        }
      }
    };
    //
    //  -----------------
    //
    vm.closeDBDataPreview = function() {
      vm.showDBDatapreview = false;
      vm.surveyDBDataLayout = [];
    };
    //
    //  -----------------
    //
    vm.isDisplayPermitted = function(displayCondition) {
      if (!Boolean(displayCondition.applyCondition)) {
        return true;
      }
      var showConditions = [];
      var hideConditions = [];
      for (var i = 0; i < displayCondition.conditions.length; i++) {
        var condition = displayCondition.conditions[i];
        if (condition.show === 'true') {
          showConditions.push(condition);
        }
        else {
          hideConditions.push(condition);
        }
      }
      if (vm.evaluateDisplayConditions(showConditions, true) &&
          !vm.evaluateDisplayConditions(hideConditions, false)) {
        return true;
      }
      return false;
    };
    //
    //  -----------------
    //
    vm.evaluateDisplayConditions = function (conditions, isShowConditions) {
      if (isShowConditions) {
        if (conditions === [] || vm.evaluateConditions(conditions)) {
          return true;
        }
        return false;
      }
      // hide conditions
      if (conditions === [] || !vm.evaluateConditions(conditions)) {
        return false;
      }
      return true;
    };
    //
    //  -----------------
    //
    vm.evaluateConditions = function (conditions) {
      var result = true;
      for (var i = 0; i < conditions.length; i++) {
        var condition = conditions[i];
        var valueOptions = vm.locateValueOptions(condition);
        var singleConditonResult = vm.evaluateConstraint(valueOptions, condition.constraint);
        if (i === 0) {
          result = singleConditonResult;
        }
        else {
          if (condition.logicalBind === vm.conditionLogicalBind.and) {
            result = result && singleConditonResult;
          }
          else {
            result = result || singleConditonResult;
          }
        }
      }
      return result;
    };
    //
    //  -----------------
    //
    vm.evaluateConstraint = function(valueOptions, constraint) {
      var found = false;
      var j;
      var option;
      if (constraint.constraintType === vm.conditionConstraintType.contain ||
          constraint.constraintType === vm.conditionConstraintType.equal) {
        for (j = 0; j < valueOptions.length; j++) {
          option = valueOptions[j];
          if (option.key === constraint.key &&
              option.userValue === constraint.userValue) {
            found = true;
            break;
          }
        }
        if (constraint.logicalPositive === vm.conditionLogicalPositive.is && found ||
            constraint.logicalPositive === vm.conditionLogicalPositive.isNot && !found) {
          return true;
        }
        return false;
      }
      // remap constraint type if negation is applied
      var constraintType = constraint.constraintType;
      if (constraint.logicalPositive === vm.conditionLogicalPositive.isNot) {
        if (constraint.constraintType === vm.conditionConstraintType.greaterThan) {
          constraintType = vm.conditionConstraintType.lessOrEqual;
        }
        if (constraint.constraintType === vm.conditionConstraintType.greaterOrEqual) {
          constraintType = vm.conditionConstraintType.lessThan;
        }
        if (constraint.constraintType === vm.conditionConstraintType.lessThan) {
          constraintType = vm.conditionConstraintType.greaterOrEqual;
        }
        if (constraint.constraintType === vm.conditionConstraintType.lessOrEqual) {
          constraintType = vm.conditionConstraintType.greaterThan;
        }
      }
      // <, <=, >, >=
      // To compare, both sides should be NUMBER
      var userEntry;
      var constraintEntry = Number(constraint.userValue);
      if (isNaN(constraintEntry)) {
        return false;
      }
      for (j = 0; j < valueOptions.length; j++) {
        option = valueOptions[j];
        if (option.key !== constraint.key) {
          continue;
        }
        userEntry = Number(option.userValue);
        if (isNaN(userEntry)) {
          continue;
        }

        var comparisonResult = 0;
        if (userEntry === constraintEntry) {
          comparisonResult = 0;
        }
        else {
          if (userEntry < constraintEntry) {
            comparisonResult = -1;
          }
          else {
            comparisonResult = 1;
          }
        }

        if ((constraintType === vm.conditionConstraintType.greaterThan &&
             comparisonResult === 1) ||
            (constraintType === vm.conditionConstraintType.lessThan &&
             comparisonResult === -1) ||
            (constraintType === vm.conditionConstraintType.greaterOrEqual &&
             comparisonResult === 0) ||
            (constraintType === vm.conditionConstraintType.lessOrEqual &&
             comparisonResult === 0)) {
          return true;
        }
      }
      return false;
    };
    //
    //  -----------------
    //
    vm.locateValueOptions = function(condition) {
      var page = _.find(vm.pages, {surveyPageId: parseInt(condition.surveyPageId)});
      if (typeof page === 'undefined') {
        return [];
      }
      var section = _.find(page.sections,
          {surveySectionId: parseInt(condition.surveySectionId)});
      if (typeof section === 'undefined') {
        return [];
      }
      var question = _.find(section.questions,
          {surveyQuestionId: parseInt(condition.surveyQuestionId)});
      if (typeof question === 'undefined') {
        return [];
      }
      return question.valueOptions;
    };
  };
  return {
    init: init
  };
})();

