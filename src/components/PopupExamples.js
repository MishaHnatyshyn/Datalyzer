// TODO: Remove this file asap )
// Just example of using popups

import React, { useState } from 'react';

import ErrorPopup from './shared/ErrorPopup';
import ConfirmPopup from './shared/ConfirmPopup';
import InformationPopup from './shared/InformationPopup';
import BasePopup from './shared/BasePopup';

const PopupBody = () => (
  <ul>
    <li>Just</li>
    <li>an</li>
    <li>example</li>
  </ul>
);

const popups = [
  <ConfirmPopup text="Are you sure?" isVisible onSubmit={() => {}} onClose={() => {}} />,
  <ErrorPopup
    onClose={() => {}}
    onSubmit={() => {}}
    text="Check"
    title="Ah shit, here we go again. Ah shit, here we go again. Ah shit, here we go again."
    isVisible
  />,
  <InformationPopup text="This is information popup" isVisible onClose={() => {}} />,
  <BasePopup body={<PopupBody />} isVisible okButton okButtonType="submit" />,
];

const PopupExamples = () => {
  const [popupNumber, changePopupNumber] = useState(0);
  setTimeout(() => {
    changePopupNumber(popupNumber >= popups.length - 1 ? 0 : popupNumber + 1);
  }, 3000);
  return <>{popups[popupNumber]}</>;
};

export default PopupExamples;
