import React from 'react';

import ErrorPopup from '../components/shared/ErrorPopup';
import ConfirmPopup from '../components/shared/ConfirmPopup';
import InformationPopup from '../components/shared/InformationPopup';
import BasePopup from '../components/shared/BasePopup';

const PopupBody = () => (
  <ul>
    <li>Just</li>
    <li>an</li>
    <li>example</li>
  </ul>
);

export default [
  <ConfirmPopup
    text="Are you sure?"
    isVisible
    onSubmit={() => {}}
    onClose={() => {}}
  />,
  <ErrorPopup
    onClose={() => {}}
    onSubmit={() => {}}
    text="Check"
    title="Ah shit, here we go again. Ah shit, here we go again. Ah shit, here we go again."
    isVisible
  />,
  <InformationPopup
    text="This is information popup"
    isVisible
    onClose={() => {}}
  />,
  <BasePopup
    body={<PopupBody />}
    isVisible
    okButton
    okButtonType="submit"
  />
];
