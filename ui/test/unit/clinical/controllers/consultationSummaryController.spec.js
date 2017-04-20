'use strict';

describe("ConsultationSummaryController", function () {

    var scope, conceptSetUiConfigService, rootScope;

    beforeEach(module('bahmni.clinical'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        scope.consultation = {
            observations: [],
            investigations: [],
            newlyAddedDiagnoses: [],
            disposition: {},
            treatmentDrugs: [],
            newlyAddedTreatments: [],
            discontinuedDrugs: [],
            pastDiagnoses: [
                {
                    encounterUuid: "9fc622c4-3cb4-4855-af58-9669265fb919",
                    isDirty: true
                },
                {
                    encounterUuid: "9fc622c4-3cb4-4855-af58-9669265fb919",
                    isDirty: false
                }
            ],
            consultationNote:{}
        };
        
        conceptSetUiConfigService = jasmine.createSpyObj('conceptSetUiConfigService', ['getConfig']);

        $controller('ConsultationSummaryController', {
            $scope: scope,
            $rootScope: rootScope,
            conceptSetUiConfigService: conceptSetUiConfigService
        });
    }));

    describe("IsConsultationTabEmpty", function(){
        it("should return false when there is no data on consultation", function() {
            expect(scope.isConsultationTabEmpty()).toBe(true);
        });

        it("should return false when there are observations", function() {
            scope.groupedObservations = [{conceptSetName: "Vitals", groupMembers: [{label: "Pulse Data"}]}];
            expect(scope.isConsultationTabEmpty()).toBe(false);
        });
    });

    describe("Testing the controller", function(){
        it("should set Consultation Notes to null", function() {
            scope.onNoteChanged();
            expect(scope.consultation.consultationNote.observationDateTime).toBe(null);
        });

        it("should return empty as there are no observations", function() {
            expect(scope.groupedObservations.length).toBe(0);
        });

        it("should negate show", function() {
            var item = {show:false};
            scope.toggle(item);
            expect(item.show).toBe(true);
        });
    });

    describe("Testing the controller with data in scope", function(){
        it("should return one diagnosis", function() {
            expect(scope.editedDiagnosesFromPastEncounters.length).toBe(1);
        });
    });
});


