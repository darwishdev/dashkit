import FormFactory from '@/utils/form/FormFactory';
import { expect, it, beforeEach, describe } from "vitest";
import initI18n from '@/plugins/i18n'
import { FormOptions, FormSeciton } from '@/types/types';

import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
describe('FormFactory', () => {
    let instance: any = null


    beforeEach(() => {
        const i18n = initI18n({ en, ar })
        instance = FormFactory
        instance.InitTranslation(i18n)
    })


    // Test InitTranslation method
    it('WithFlex Working properly', () => {
        // Define test data
        const flexChildren = [
            {
                $el: 'span',
                attrs: {
                    class: 'child-span',
                },
                children: 'Child 1',
            },
            {
                $el: 'span',
                attrs: {
                    class: 'child-span',
                },
                children: 'Child 2',
            },
        ];
        const flextTestCases = [
            {
                params: {
                    flexChildren,
                    justify: "between"
                },
                expectedResult: {
                    $el: 'div',
                    attrs: {
                        class: 'flex justify-content-between align-items-center',
                    },
                    children: flexChildren,
                }
            },
            {
                params: {
                    flexChildren,
                    justify: "center"
                },
                expectedResult: {
                    $el: 'div',
                    attrs: {
                        class: 'flex justify-content-center align-items-center',
                    },
                    children: flexChildren,
                }
            },
            {
                params: {
                    flexChildren,
                    justify: "start"
                },
                expectedResult: {
                    $el: 'div',
                    attrs: {
                        class: 'flex justify-content-start align-items-center',
                    },
                    children: flexChildren,
                }
            }
        ]

        flextTestCases.forEach(testCase => {
            const result = instance.withFlex(testCase.params.flexChildren, testCase.params.justify);
            expect(result).toEqual(testCase.expectedResult);
        })
    });




    // Test InitTranslation method
    it('WithBackground Working properly', () => {
        // Define test data
        const childrenComponents = [
            {
                $el: 'span',
                children: 'Child 1',
            },
            {
                $el: 'span',
                children: 'Child 2',
            },
        ];
        const testCases = [
            {
                params: {
                    elements: childrenComponents,
                    withBackground: true
                },
                expectedResult: {
                    $el: 'div',
                    attrs: {
                        class: 'bg-card p-4 border-round mb-4'
                    },
                    children: childrenComponents
                }
            },
            {
                params: {
                    elements: childrenComponents,
                    withBackground: false
                },
                expectedResult: {
                    $el: 'div',
                    attrs: {
                        class: ''
                    },
                    children: childrenComponents
                }
            },
        ]

        testCases.forEach(testCase => {
            const result = instance.WithBackground(testCase.params.elements, testCase.params.withBackground);
            expect(result).toEqual(testCase.expectedResult);
        })
    });


    it('HeaderRight Working properly', () => {
        const formOptions = {
            showHeaderSubmit: true,
            allowBulkCreate: true,
        };

        const headerRightTestCases = [
            {
                params: {
                    options: formOptions,
                },
                expectedResult: [
                    {
                        $formkit: 'submit',
                        outerClass: 'mt-4 w-full',
                        label: 'submit',
                    },
                    {
                        $formkit: 'toggle',
                        outerClass: 'mb-0 mx-4',
                        label: instance.t("stayOnSamePageAfterSuccess"),
                        name: 'isBulkCreate',
                    },
                ],
            },
            {
                params: {
                    options: {
                        showHeaderSubmit: true,
                        allowBulkCreate: false,
                    },
                },
                expectedResult: [
                    {
                        $formkit: 'submit',
                        outerClass: 'mt-4 w-full',
                        label: 'submit',
                    },
                ],
            },
            {
                params: {
                    options: {
                        showHeaderSubmit: false,
                        allowBulkCreate: true,
                    },
                },
                expectedResult: [
                    {
                        $formkit: 'toggle',
                        outerClass: 'mb-0 mx-4',
                        label: instance.t("stayOnSamePageAfterSuccess"),
                        name: 'isBulkCreate',
                    },
                ],
            },
            {
                params: {
                    options: {
                        showHeaderSubmit: false,
                        allowBulkCreate: false,
                    },
                },
                expectedResult: [],
            },
        ];

        headerRightTestCases.forEach(testCase => {
            const result = instance.HeaderRight(testCase.params.options);
            expect(result).toEqual(testCase.expectedResult);
        });
    });




    it('WithGrid Working properly', () => {
        const gridTestCases = [
            {
                params: {
                    elements: [
                        {
                            $el: 'span',
                            attrs: {
                                class: 'child-span',
                            },
                            children: 'Child 1',
                        },
                        {
                            $el: 'span',
                            attrs: {
                                class: 'child-span',
                            },
                            children: 'Child 2',
                        },
                    ],
                },
                expectedResult: {
                    $el: 'div',
                    attrs: {
                        class: 'grid',
                    },
                    children: [
                        {
                            $el: 'span',
                            attrs: {
                                class: 'child-span',
                            },
                            children: 'Child 1',
                        },
                        {
                            $el: 'span',
                            attrs: {
                                class: 'child-span',
                            },
                            children: 'Child 2',
                        },
                    ],
                },
            },
            // Add more test cases as needed
        ];

        gridTestCases.forEach(testCase => {
            const result = instance.WithGrid(testCase.params.elements);
            expect(result).toEqual(testCase.expectedResult);
        });
    });

    it('Header Working properly', () => {
        const headerTestCases = [
            {
                params: {
                    options: {
                        title: 'Form Title',
                        showHeaderSubmit: true,
                        allowBulkCreate: false,
                    },
                    withHeader: true,
                },
                expectedResult: [
                    {
                        $el: 'div',
                        attrs: {
                            class: 'flex justify-content-between align-items-center',
                        },
                        children: [
                            {
                                $el: 'h1',
                                attrs: {
                                    class: 'mx-2 title'
                                },
                                children: 'Form Title'
                            },
                            {
                                $el: 'div',
                                attrs: {
                                    class: 'flex justify-content- align-items-center',
                                },
                                children: [instance.SubmitBtn]
                            }


                        ],
                    },
                    instance.hr
                ],
            },
            {
                params: {
                    options: {
                        title: 'Form Title',
                        showHeaderSubmit: true,
                        allowBulkCreate: true,
                    },
                    withHeader: true,
                },
                expectedResult: [
                    {
                        $el: 'div',
                        attrs: {
                            class: 'flex justify-content-between align-items-center',
                        },
                        children: [
                            {
                                $el: 'h1',
                                attrs: {
                                    class: 'mx-2 title'
                                },
                                children: 'Form Title'
                            },
                            {
                                $el: 'div',
                                attrs: {
                                    class: 'flex justify-content- align-items-center',
                                },
                                children: [instance.SubmitBtn, instance.BulkCreateSwitch()]
                            }
                        ],
                    },
                    instance.hr
                ],
            },
            {
                params: {
                    options: {
                        title: 'Form Title',
                        showHeaderSubmit: false,
                        allowBulkCreate: false,
                    },
                    withHeader: true,
                },
                expectedResult: [
                    {
                        $el: 'div',
                        attrs: {
                            class: 'flex justify-content-between align-items-center',
                        },
                        children: [
                            {
                                $el: 'h1',
                                attrs: {
                                    class: 'mx-2 title'
                                },
                                children: 'Form Title'
                            },
                            {
                                $el: 'div',
                                attrs: {
                                    class: 'flex justify-content- align-items-center',
                                },
                                children: []
                            }
                        ],
                    },
                    instance.hr
                ],
            },
            {
                params: {
                    withHeader: false,
                },
                expectedResult: [],
            }
        ];

        headerTestCases.forEach(testCase => {
            const result = instance.Header(testCase.params.options, testCase.params.withHeader);
            expect(result).toEqual(testCase.expectedResult);
        });
    });


    it('CreateSectionOutput Working properly', () => {
        const sections = [
            {
                section_1: [
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field1',
                        },
                    },
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field2',
                        },
                    },
                ],
            },
            {
                section_2: [
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field3',
                        },
                    },
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field4',
                        },
                    },
                ],
            },
            // Add more sections as needed
        ];

        const withBackgroundValues = [true, false];

        const sectionTestCases: any = [];
        sections.forEach(section => {
            withBackgroundValues.forEach(withBackground => {
                const sectionTitle = instance.SectionFirstKey(section);
                const formTitle = {
                    $el: 'h1',
                    attrs: {
                        class: 'mx-2 title',
                    },
                    children: sectionTitle,
                };
                const inputs = section[sectionTitle];
                const expectedResult = {
                    $el: 'div',
                    attrs: {
                        class: withBackground ? 'bg-card p-4 border-round mb-4' : '',
                    },
                    children: [
                        formTitle,
                        {
                            $el: 'div',
                            attrs: {
                                class: 'grid',
                            },
                            children: inputs,
                        },
                    ],
                };

                sectionTestCases.push({
                    params: {
                        section,
                        withBackground,
                    },
                    expectedResult,
                });
            });
        });

        sectionTestCases.forEach(testCase => {
            const result = instance.CreateSectionOutput(testCase.params.section, testCase.params.withBackground);
            expect(result).toEqual(testCase.expectedResult);
        });
    });



    it('ConvertSections Working properly', () => {
        const sections = [
            {
                section_1: [
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field1',
                        },
                    },
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field2',
                        },
                    },
                ],
            },
            {
                section_2: [
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field3',
                        },
                    },
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field4',
                        },
                    },
                ],
            },
            // Add more sections as needed
        ];

        const sectionsWithSubmitBtn = sections
        sectionsWithSubmitBtn[1]['section_2']!.push(instance.SubmitBtn)
        const convertTestCases = [
            {
                params: {
                    sections,
                    withBackground: true,
                },
                expectedResult: sectionsWithSubmitBtn.map((section) => {
                    return instance.CreateSectionOutput(section, true)
                }
                ),
            },
            {
                params: {
                    sections,
                    withBackground: false,
                },
                expectedResult: sectionsWithSubmitBtn.map((section) => {
                    return instance.CreateSectionOutput(section, false)
                }),
            },
            // Add more test cases as needed
        ];
        convertTestCases.forEach(testCase => {
            const result = instance.ConvertSections(testCase.params.sections, testCase.params.withBackground);
            expect(result).toEqual(testCase.expectedResult);
        });
    });


    it('CreateForm Working properly', () => {
        const sections = [
            {
                section_1: [
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field1',
                        },
                    },
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field2',
                        },
                    },
                ],
            },
            {
                section_2: [
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field3',
                        },
                    },
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field4',
                        },
                    },
                ],
            },
        ];

        // Test case 1: With header and with background
        const options1 = {
            id: 'test-form',
            title: 'Test Form 1',
            allowBulkDelete: true,
            showHeaderSubmit: true,
            withHeader: true,
            withBackground: true,
        };
        const expectedResult1 = instance.WithBackground(
            [
                ...instance.Header(options1, true),
                ...instance.ConvertSections(sections, true),
            ],
            true
        );

        // Test case 2: Without header and with background
        const options2 = {
            id: 'test-form2',
            title: '',
            allowBulkDelete: false,
            showHeaderSubmit: false,
            withHeader: false,
            withBackground: true,
        };
        const expectedResult2 = instance.WithBackground(
            instance.ConvertSections(sections, true),
            false
        );

        // Test case 3: With header and without background
        const options3 = {
            id: 'test-form3',
            title: 'Test Form 3',
            allowBulkDelete: true,
            showHeaderSubmit: true,
            withHeader: true,
            withBackground: false,
        };
        const expectedResult3 = instance.WithBackground(
            [
                ...instance.Header(options3, true),
                ...instance.ConvertSections(sections, false),
            ],
            false
        );

        // Test case 4: Without header and without background
        const options4 = {
            id: "test-form4",
            title: '',
            allowBulkDelete: false,
            showHeaderSubmit: false,
            withHeader: false,
            withBackground: false,
        };
        const expectedResult4 = instance.WithBackground(
            instance.ConvertSections(sections, false),
            false
        );

        const formTestCases = [
            {
                params: {
                    options: options1,
                    sections,
                },
                expectedResult: expectedResult1,
            },
            {
                params: {
                    options: options2,
                    sections,
                },
                expectedResult: expectedResult2,
            },
            {
                params: {
                    options: options3,
                    sections,
                },
                expectedResult: expectedResult3,
            },
            {
                params: {
                    options: options4,
                    sections,
                },
                expectedResult: expectedResult4,
            },
        ];

        formTestCases.forEach(testCase => {
            const result = instance.CreateForm(
                testCase.params.options,
                testCase.params.sections
            );
            expect(result).toEqual(testCase.expectedResult);
        });
    });



    it('Caching form', () => {
        // Define test data
        const options: FormOptions = {
            title: 'Test Form',
            id: "test-form",
            allowBulkCreate: true,
            showHeaderSubmit: true,
            withHeader: true,
            withBackground: true,
        };

        const sections: FormSeciton[] = [
            {
                section_1: [
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field1',
                        },
                    },
                    {
                        $el: 'input',
                        attrs: {
                            type: 'text',
                            name: 'field2',
                        },
                    },
                ],
            },
        ];

        // Call the CreateForm method twice with the same options
        const result1 = instance.CreateForm(options, sections);
        const result2 = instance.CreateForm(options, sections);

        // Assert that the two results are equal, indicating that the form was cached
        expect(result1).toEqual(result2);

        // Modify the options and call the CreateForm method again
        const modifiedOptions: FormOptions = {
            ...options,
            id: 'Modified-Form',
        };
        const result3 = instance.CreateForm(modifiedOptions, sections);

        // Assert that the new result is not equal to the previous result, indicating that a new form is created
        expect(result3).not.toEqual(result1);
    });


});
